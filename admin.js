import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Access denied. Please sign in.</p>

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Admin / Account</h1>
        <p className="mt-2">Signed in as {session.user.email}</p>

        <div className="mt-6">
          <Link href="/demo"><a className="px-4 py-2 bg-blue-600 text-white rounded">Open Demo Generator</a></Link>
        </div>
      </div>
    </div>
  )
}
