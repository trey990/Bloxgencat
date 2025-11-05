import Head from 'next/head'
import Hero from '../components/Hero'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo Profile Generator — Safe Landing</title>
        <meta name="description" content="A safe demo profile generator landing page scaffold." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="max-w-6xl mx-auto p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">DemoGen</h1>
          <nav>
            <Link href="/demo"><a className="px-4 py-2 bg-blue-600 text-white rounded">Try demo</a></Link>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <Hero />
          <section className="mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="mt-4 space-y-2">
              <li>Landing + pricing layout</li>
              <li>Client-side demo profile generator (no external account creation)</li>
              <li>Ready for Next.js + Tailwind development</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Get started</h2>
            <p className="mt-2">Click <Link href="/demo"><a className="text-blue-600 underline">Try demo</a></Link> to generate sample profiles locally.</p>
          </section>
        </main>

        <footer className="max-w-6xl mx-auto p-6 text-sm text-gray-500">
          Built with care — demo only. Add Auth, Stripe, and DB as next steps.
        </footer>
      </div>
    </>
  )
}
