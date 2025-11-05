import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import prisma from '../../lib/prisma'

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user?.id) return res.status(401).json({ error: 'Not authenticated' })

  const subs = await prisma.subscription.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 1
  })

  res.json({ subscription: subs[0] || null })
}
