import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setResult('')

    try {
      // This will be updated to call your backend API
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (response.ok) {
        const data = await response.json()
        setResult(`Download successful! ${data.message}`)
      } else {
        setResult('Download failed. Please try again.')
      }
    } catch (error) {
      setResult('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>YouTube Video Downloader</title>
        <meta name="description" content="Download YouTube videos easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-md mx-auto">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              YouTube Video Downloader
            </h1>
            <p className="text-gray-600">
              Download your favorite YouTube videos easily and quickly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                id="url"
                name="url"
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !url}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Downloading...' : 'Download Video'}
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
