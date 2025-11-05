import { buffer } from 'micro'
import Stripe from 'stripe'
import prisma from '../../../lib/prisma'

export const config = {
  api: { bodyParser: false }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')
  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)
  let event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  const { type, data } = event

  try {
    if (type === 'checkout.session.completed') {
      const session = data.object
      const userId = session.client_reference_id || null
      const stripeSubscriptionId = session.subscription || null

      if (userId && stripeSubscriptionId) {
        // create or update subscription record
        await prisma.subscription.upsert({
          where: { stripeId: stripeSubscriptionId },
          update: {
            status: 'active',
            userId: userId,
            priceId: session.display_items?.[0]?.price?.id || null,
          },
          create: {
            userId: userId,
            stripeId: stripeSubscriptionId,
            status: 'active',
            priceId: session.display_items?.[0]?.price?.id || null,
          }
        })
      } else if (userId && !stripeSubscriptionId) {
        // If subscription ID isn't available on session, create a placeholder record
        await prisma.subscription.create({
          data: {
            userId: userId,
            stripeId: `sess_${session.id}`,
            status: 'active',
            priceId: null
          }
        })
      }
    } else if (type === 'customer.subscription.created' || type === 'customer.subscription.updated') {
      const sub = data.object
      // sync subscription status to DB
      await prisma.subscription.upsert({
        where: { stripeId: sub.id },
        update: {
          status: sub.status,
          priceId: sub.items?.data?.[0]?.price?.id || null,
        },
        create: {
          userId: null,
          stripeId: sub.id,
          status: sub.status,
          priceId: sub.items?.data?.[0]?.price?.id || null,
        }
      })
    } else if (type === 'invoice.payment_failed') {
      const invoice = data.object
      const subId = invoice.subscription
      if (subId) {
        await prisma.subscription.updateMany({
          where: { stripeId: subId },
          data: { status: 'past_due' }
        })
      }
    }
  } catch (err) {
    console.error('Error handling webhook:', err)
  }

  res.json({ received: true })
}
