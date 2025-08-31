// Downloader UI moved from page.tsx
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Skeleton } from './ui/skeleton'
import { toast } from "sonner"

export default function Downloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSkeleton, setShowSkeleton] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setShowSkeleton(true)
    setError('')

    try {
      const res = await fetch('http://localhost:8000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (res.ok) {
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json()
          if (data.status === 'success') {
            toast.success('Download started!')
          } else if (data.status === 'error') {
            setError(data.message || 'Download failed')
            toast.error(data.message || 'Download failed')
          }
        } else {
          // Assume it's a file
          const blob = await res.blob()
          const downloadUrl = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = downloadUrl
          a.download = 'video.mp4'
          document.body.appendChild(a)
          a.click()
          a.remove()
          toast.success('Download complete!')
        }
      } else {
        let msg = 'Download failed'
        try {
          const data = await res.json()
          msg = data.detail || data.message || msg
        } catch {}
        setError(msg)
        toast.error(msg)
      }
    } catch (err: any) {
      setError('Network error: ' + err.message)
      toast.error('Network error: ' + err.message)
    } finally {
      setLoading(false)
      setShowSkeleton(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">YouTube Video Downloader</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">YouTube Link</Label>
              <Input
                id="url"
                type="text"
                placeholder="Paste YouTube link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className=""
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !url}
              className="w-full"
              size="lg"
            >
              {loading ? 'Downloading...' : 'Download'}
            </Button>
            {showSkeleton && (
              <div className="mt-4">
                <Skeleton className="h-6 w-3/4 mb-2 animate-pulse" />
                <Skeleton className="h-4 w-1/2 animate-pulse" />
                <Skeleton className="h-40 w-full mt-4 animate-pulse rounded-lg" />
              </div>
            )}
            {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
          </form>
        </CardContent>
      </Card>
    </main>
  )
} 