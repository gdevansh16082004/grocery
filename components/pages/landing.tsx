import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image with blur effect */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "blur(8px)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="rounded-full bg-primary/10 p-3">
            <svg
              className="h-10 w-10 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h2l2.64 13.14a2 2 0 0 0 2 1.62h9.72a2 2 0 0 0 2-1.62L22 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Fast & Affordable Groceries for College Students
          </h1>

          {/* Subtext */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Get groceries delivered to your dorm or apartment in minutes. We partner with local stores to bring you the
            best prices and fastest delivery.
          </p>

          {/* Login buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-4">
           <Link  href={'/userlogin'}>  <Button  className=" py-6 text-lg transition-all hover:translate-y-[-2px] hover:shadow-lg" size="lg">
              Login as Student
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button> </Link>

           <Link href={'/sellerlogin'}> <Button
              className=" py-6 text-lg transition-all hover:translate-y-[-2px] hover:shadow-lg"
              variant="outline"
              size="lg"
            >
              Login as Seller
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button></Link>
          </div>

          {/* Seller registration link */}
          <div className="mt-2">
            <Link href="/sellerlogin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              New Seller? Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

