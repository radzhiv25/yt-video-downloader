"use client"

import { Button } from "../ui/button"
import { Download, Menu, X, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-dashed border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-2 bg-black rounded-xl">
                <Download className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="font-bold text-xl text-black">YTDownloader</span>
              <div className="text-xs text-gray-500 -mt-1">Free & Secure</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-600 hover:text-black transition-colors font-medium">
              How it Works
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-black transition-colors font-medium">
              Features
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-black transition-colors font-medium">
              FAQ
            </Link>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>100% Safe</span>
            </div>
            <Link href="/download">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 font-medium">
                Start Download
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-dashed border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="#how-it-works" className="text-gray-600 hover:text-black transition-colors font-medium">
                How it Works
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-black transition-colors font-medium">
                Features
              </Link>
              <Link href="#faq" className="text-gray-600 hover:text-black transition-colors font-medium">
                FAQ
              </Link>
              <Link href="/download">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 w-fit font-medium">
                  Start Download
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
