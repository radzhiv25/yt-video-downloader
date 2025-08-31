"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Music, Shield, Zap, Star, Github, Play, CheckCircle, ArrowRight, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/common/navbar"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { TestimonialDialog } from "@/components/common/TestimonialDialog"
import { Avatar } from "@/components/ui/avatar"

// Types
interface Stat {
  number: string | number
  label: string
}
interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
  created_at?: string
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [stats, setStats] = useState<Stat[]>([
    { number: "1,234", label: "Downloads Today" },
    { number: "5,678", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8/5", label: "User Rating" },
  ])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [testimonialForm, setTestimonialForm] = useState<Testimonial>({ name: "", role: "", content: "", rating: 5 })
  const [submitting, setSubmitting] = useState(false)

  const refreshStats = () => {
    // For static export, we'll use placeholder data
    // In production, you can replace this with direct backend calls
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    
    // Only try to fetch if we're not in static export mode
    if (typeof window !== 'undefined') {
      fetch(`${backendUrl}/stats`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setStats([
              { number: data.downloads_today || "1,234", label: "Downloads Today" },
              { number: data.happy_users || "5,678", label: "Happy Users" },
              { number: data.system_uptime || "99.9%", label: "Uptime" },
              { number: data.user_rating || "4.8/5", label: "User Rating" },
            ])
          }
        })
        .catch(err => {
          console.error('Failed to fetch stats:', err)
          // Keep placeholder data on error
        })
    }
  }

  useEffect(() => {
    // Initial load of stats and testimonials
    refreshStats()

    // Fetch testimonials
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }).then((res) => {
      const data = res.data
      if (data) setTestimonials(data)
    })
  }, [])

  const faqs = [
    {
      question: "Is this YouTube downloader completely free?",
      answer:
        "Yes, our YouTube downloader is 100% free to use. No hidden fees, no subscriptions, no premium features locked behind paywalls.",
    },
    {
      question: "What video qualities can I download?",
      answer:
        "You can download videos in various qualities including 720p HD, 1080p Full HD, and up to 4K resolution, depending on the original video quality.",
    },
    {
      question: "Is it safe to use this downloader?",
      answer:
        "Absolutely. All processing happens locally on your device. We don't store your data, track your downloads, or require any personal information.",
    },
    {
      question: "Can I download audio only from YouTube videos?",
      answer:
        "Yes! You can extract high-quality MP3 audio files from any YouTube video, perfect for music, podcasts, or educational content.",
    },
    {
      question: "Are there any download limits?",
      answer:
        "No limits! Download as many videos as you want. Our tool is designed to handle multiple downloads efficiently.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-dashed border-green-200 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">Free • No Registration • Instant Download</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              Download YouTube Videos
              <span className="block text-gray-600 text-4xl md:text-6xl mt-2">in Seconds</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The fastest and most reliable YouTube downloader. Get videos in HD quality, extract audio, and enjoy
              offline content anywhere. <span className="font-semibold text-black">100% free and secure.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/download">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 group"
                >
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start Downloading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-dashed border-gray-300 hover:border-black px-8 py-4 text-lg font-medium rounded-full bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-black">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Download any YouTube video in just 3 simple steps. No software installation required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Copy YouTube URL",
                description: "Find the YouTube video you want to download and copy its URL from the address bar.",
                icon: "🔗",
              },
              {
                step: "02",
                title: "Paste & Choose Format",
                description: "Paste the URL in our downloader and select your preferred format - video or audio only.",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Download Instantly",
                description: "Click download and get your file in seconds. All processing happens on your device.",
                icon: "📥",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="relative bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-sm font-bold text-gray-400 mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-black mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
                {index < 2 && (
                  <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-300">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced Bento Grid */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Why Choose Our Downloader?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with privacy, speed, and quality in mind. Everything you need for YouTube downloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Large feature card */}
            <Card className="md:col-span-2 lg:row-span-2 bg-black text-white border-2 border-dashed border-gray-300">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white rounded-lg mr-4">
                      <Download className="h-8 w-8 text-black" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Ultra HD Downloads</h3>
                      <p className="text-gray-300">Up to 4K Resolution</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Download videos in the highest quality available. From 720p HD to stunning 4K resolution, enjoy
                    crystal clear viewing on any device.
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>4K Support</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>HD Quality</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audio feature */}
            <Card className="bg-white border-2 border-dashed border-gray-300 hover:border-black transition-colors duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg w-fit">
                    <Music className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Audio Extraction</h3>
                <p className="text-gray-600 mb-4">Extract high-quality MP3 audio from any video.</p>
                <div className="text-sm text-gray-500">320kbps Quality</div>
              </CardContent>
            </Card>

            {/* Privacy feature */}
            <Card className="bg-white border-2 border-dashed border-gray-300 hover:border-black transition-colors duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="p-3 bg-green-50 rounded-lg w-fit">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">100% Private</h3>
                <p className="text-gray-600 mb-4">All processing happens locally. Zero data collection.</p>
                <div className="text-sm text-gray-500">GDPR Compliant</div>
              </CardContent>
            </Card>

            {/* Speed feature */}
            <Card className="bg-white border-2 border-dashed border-gray-300 hover:border-black transition-colors duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="p-3 bg-yellow-50 rounded-lg w-fit">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Lightning Fast</h3>
                <p className="text-gray-600 mb-4">Download speeds up to 10MB/s with optimized processing.</p>
                <div className="text-sm text-gray-500">Avg. 3 seconds</div>
              </CardContent>
            </Card>

            {/* No limits card */}
            <Card className="bg-gradient-to-br from-gray-900 to-black text-white border-2 border-dashed border-gray-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">∞</div>
                <h3 className="font-bold mb-2">No Limits</h3>
                <p className="text-gray-300 text-sm">Unlimited downloads, forever free</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Loved by Millions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join over 1 million users who trust our downloader for their daily YouTube downloads.
            </p>
          </div>

          <TestimonialDialog
            testimonialForm={testimonialForm}
            setTestimonialForm={setTestimonialForm}
            submitting={submitting}
            setSubmitting={setSubmitting}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            supabase={supabase}
            onTestimonialAdded={refreshStats}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-2 border-dashed border-gray-300 hover:border-black transition-colors duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {testimonial.rating % 1 >= 0.5 && (
                      <HalfStar key="half" className="h-4 w-4 text-yellow-400" />
                    )}
                    {[...Array(5 - Math.floor(testimonial.rating) - (testimonial.rating % 1 >= 0.5 ? 1 : 0))].map((_, i) => (
                      <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {/* {testimonial.avatar} */}
                      <Avatar />
                    </div>
                    <div>
                      <div className="font-semibold text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      {testimonial.created_at && (
                        <div className="text-xs text-gray-400">{new Date(testimonial.created_at).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our YouTube downloader.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white border-2 border-dashed border-gray-300">
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-black text-lg">{faq.question}</h3>
                    {openFaq === index ? (
                      <Minus className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-black text-white border-2 border-dashed border-gray-300 overflow-hidden relative">
            <CardContent className="p-12 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join millions of users who download their favorite YouTube content safely and quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/download">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full"
                  >
                    Start Downloading Now
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-dashed border-gray-600 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium rounded-full bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"></div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-dashed border-gray-300 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-black rounded-xl">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl text-black">YTDownloader</span>
                  <div className="text-xs text-gray-500">Free YouTube Downloader</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                The most trusted YouTube downloader with over 1 million downloads. Fast, secure, and completely free.
              </p>
              <div className="flex space-x-4">
                <Link href="https://github.com" className="text-gray-600 hover:text-black transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Product</h4>
              <div className="space-y-2">
                <Link href="#features" className="block text-gray-600 hover:text-black transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="block text-gray-600 hover:text-black transition-colors">
                  How it Works
                </Link>
                <Link href="/download" className="block text-gray-600 hover:text-black transition-colors">
                  Download
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/disclaimer" className="block text-gray-600 hover:text-black transition-colors">
                  Disclaimer
                </Link>
                <Link href="/privacy" className="block text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-600 hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 YTDownloader. All rights reserved. • Built for educational and personal use only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Add this inline SVG for half star (or use your own icon library)
const HalfStar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill="url(#half)"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);
