import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AccountPage(){
  const { data: session, status } = useSession()
  const [sub, setSub] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (!session) return
    setLoading(true)
    fetch('/api/subscription').then(r=>r.json()).then(data=>{
      setSub(data.subscription || null)
      setLoading(false)
    }).catch(e=>{
      console.error(e)
      setLoading(false)
    })
  },[session])

  if (status === 'loading') return <p>Loading...</p>

  if (!session) return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="mt-2">You must sign in to view your account.</p>
        <div className="mt-4">
          <button onClick={()=>signIn()} className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="mt-2">Signed in as {session.user.email}</p>

        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Subscription</h2>
          {loading ? <p>Loading subscription...</p> : (
            sub ? (
              <div>
                <p className="mt-2">Status: <strong>{sub.status}</strong></p>
                <p>Price ID: {sub.priceId || '—'}</p>
                <p>Stripe ID: {sub.stripeId}</p>
              </div>
            ) : (
              <div>
                <p className="mt-2">You do not have an active subscription.</p>
                <Link href="/pricing"><a className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded">Choose a plan</a></Link>
              </div>
            )
          )}
        </div>

        <div className="mt-6">
          <button onClick={()=>signOut()} className="px-4 py-2 bg-gray-200 rounded">Sign out</button>
        </div>
      </div>
    </div>
  )
}
