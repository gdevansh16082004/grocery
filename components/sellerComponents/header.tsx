"use client"

import { Bell, Search } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger className="lg:hidden" />
      <div className="w-full flex-1">
        <form className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 md:w-2/3 lg:w-1/3" />
          </div>
        </form>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
    </header>
  )
}

