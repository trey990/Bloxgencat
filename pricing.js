import { useState } from 'react'

export default function Pricing(){
  const [loading, setLoading] = useState(false)

  async function startCheckout(){
    setLoading(true)
    // Replace this price ID with your Stripe price ID
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || 'price_12345'
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ priceId })
    })
    const data = await res.json()
    setLoading(false)
    if (data.url) {
      window.location = data.url
    } else {
      alert('Error creating checkout session')
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Pricing</h1>
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Pro — Monthly</h2>
          <p className="mt-2">Best for individuals testing features.</p>
          <div className="mt-4">
            <button onClick={startCheckout} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Starting...' : 'Subscribe'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
