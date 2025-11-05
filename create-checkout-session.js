import Stripe from 'stripe'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import prisma from '../lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const { priceId } = req.body
  if (!priceId) return res.status(400).json({ error: 'Missing priceId' })

  try {
    // Ensure a Stripe Customer exists for this user (you can store mapping in your DB)
    // For this starter, we simply create a Checkout Session and rely on client_reference_id to link back to the user.
    const checkout = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/account`,
      client_reference_id: session.user.id,
      customer_email: session.user.email,
    })

    res.json({ url: checkout.url })
  } catch (err) {
    console.error('Error creating checkout session', err)
    res.status(500).json({ error: 'Internal error' })
  }
}
