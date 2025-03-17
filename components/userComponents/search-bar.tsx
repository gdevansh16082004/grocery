"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)

    if (searchQuery) {
      params.set("query", searchQuery)
    } else {
      params.delete("query")
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for groceries..."
          className="w-full pl-10 h-12 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10">
          Search
        </Button>
      </div>
    </form>
  )
}

