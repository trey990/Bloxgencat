import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prismaClient from '../../../lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'database' },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    }
  }
}

export default NextAuth(authOptions)
