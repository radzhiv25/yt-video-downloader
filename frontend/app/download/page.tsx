"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Music, ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function DownloadPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [downloadType, setDownloadType] = useState<"video" | "audio" | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showSkeleton, setShowSkeleton] = useState(false)

  const handleDownload = async (type: "video" | "audio") => {
    if (!url.trim()) return
    setIsLoading(true)
    setShowSkeleton(true)
    setDownloadType(type)
    setIsSuccess(false)
    setError("")

    try {
      const res = await fetch("http://localhost:8000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type }),
      })

      if (res.ok) {
        const contentType = res.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json()
          if (data.status === "success") {
            toast.success("Download started!")
            setIsSuccess(true)
            try {
              const res = await fetch('http://localhost:8000/increment-download', { method: 'POST' });
              if (!res.ok) {
                // Optionally handle error
                console.error('Failed to increment download');
              }
            } catch (err) {
              console.error('Error incrementing download:', err);
            }
          } else if (data.status === "error") {
            setError(data.message || "Download failed")
            toast.error(data.message || "Download failed")
          }
        } else {
          // Assume it's a file
          const blob = await res.blob()
          const downloadUrl = window.URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = downloadUrl
          a.download = type === "audio" ? "audio.mp3" : "video.mp4"
          document.body.appendChild(a)
          a.click()
          a.remove()
          toast.success("Download complete!")
          setIsSuccess(true)
          try {
            const res = await fetch('http://localhost:8000/increment-download', { method: 'POST' });
            if (!res.ok) {
              // Optionally handle error
              console.error('Failed to increment download');
            }
          } catch (err) {
            console.error('Error incrementing download:', err);
          }
        }
      } else {
        let msg = "Download failed"
        try {
          const data = await res.json()
          msg = data.detail || data.message || msg
        } catch {}
        setError(msg)
        toast.error(msg)
      }
    } catch (err: any) {
      setError("Network error: " + err.message)
      toast.error("Network error: " + err.message)
    } finally {
      setIsLoading(false)
      setShowSkeleton(false)
      // Reset after 3 seconds if success
      if (!error && !showSkeleton) {
        setTimeout(() => {
          setIsSuccess(false)
          setDownloadType(null)
          setUrl("")
        }, 3000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="p-6 border-b border-dashed border-gray-300">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </header> */}

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4 py-12">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Download Your Video</h1>
            <p className="text-xl text-gray-600">Paste your YouTube link below and choose your preferred format</p>
          </div>

          <Card className="bg-white border-2 border-dashed border-gray-300 shadow-lg">
            <CardContent className="p-8">
              {!isSuccess ? (
                <div className="space-y-6">
                  {/* URL Input */}
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-black font-medium text-lg">YouTube URL</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="border-2 border-dashed border-gray-300 focus:border-black text-lg py-3 rounded-lg"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Download Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleDownload("video")}
                      disabled={!url.trim() || isLoading}
                      className="bg-black text-white hover:bg-gray-800 py-4 text-lg font-medium rounded-lg border-2 border-dashed border-transparent hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading && downloadType === "video" ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Download Video
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => handleDownload("audio")}
                      disabled={!url.trim() || isLoading}
                      className="bg-white text-black border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 py-4 text-lg font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading && downloadType === "audio" ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Music className="mr-2 h-5 w-5" />
                          Download Audio
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Loading State / Skeleton */}
                  {showSkeleton && (
                    <div className="mt-4">
                      <Skeleton className="h-6 w-3/4 mb-2 animate-pulse" />
                      <Skeleton className="h-4 w-1/2 animate-pulse" />
                      <Skeleton className="h-40 w-full mt-4 animate-pulse rounded-lg" />
                    </div>
                  )}
                  {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
                </div>
              ) : (
                /* Success State */
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-6">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-4">Your file is ready!</h2>
                  <p className="text-xl text-gray-600 mb-6">
                    {downloadType === "video"
                      ? "Video (MP4) download completed successfully"
                      : "Audio (MP3) download completed successfully"}
                  </p>
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <p className="text-gray-600">Check your downloads folder for the file</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              💡 Tip: Make sure the YouTube URL is valid and the video is publicly accessible
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 