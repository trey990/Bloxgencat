import { useState } from 'react'

function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function randomInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }

export default function Demo() {
  const [profile, setProfile] = useState(null)

  function generate(){
    const names = ['Nova','Ace','Raven','Sky','Blaze','Echo','Kai','Maya','Jade','Zed']
    const adjectives = ['silent','golden','broken','wild','lonely','cosmic','urban','steady']
    const bios = [
      'Lover of late nights and loud beats.',
      'Building stories one day at a time.',
      'Coffee, code, and chaotic energy.',
      'Chasing sunsets and better versions of myself.'
    ]

    const p = {
      username: randomItem(names) + randomInt(10,999),
      displayName: randomItem(names) + ' ' + randomItem(adjectives),
      bio: randomItem(bios),
      createdAt: new Date(Date.now() - randomInt(1,1000)*24*60*60*1000).toISOString(),
      level: randomInt(1,100),
      stats: {
        followers: randomInt(0,10000),
        posts: randomInt(0,2000)
      }
    }
    setProfile(p)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Profile Demo Generator</h1>
        <p className="mt-2 text-sm text-gray-600">This generates randomized demo profile data client-side only. It does not create accounts on any platform.</p>

        <div className="mt-6 flex gap-3">
          <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded">Generate profile</button>
        </div>

        {profile && (
          <div className="mt-6 bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold">{profile.displayName} <span className="text-sm text-gray-500">({profile.username})</span></h2>
            <p className="mt-2 text-sm text-gray-700">{profile.bio}</p>
            <div className="mt-4 text-sm text-gray-600">
              <div>Created: {new Date(profile.createdAt).toLocaleString()}</div>
              <div>Level: {profile.level}</div>
              <div>Followers: {profile.stats.followers} • Posts: {profile.stats.posts}</div>
            </div>

            <pre className="mt-4 bg-gray-100 p-3 rounded text-xs overflow-auto">{JSON.stringify(profile,null,2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
