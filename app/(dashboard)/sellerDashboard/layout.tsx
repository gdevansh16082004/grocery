import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/sellerComponents/sidebar"
import "@/app/globals.css"

export const metadata = {
  title: "Seller Dashboard",
  description: "Professional seller dashboard with analytics and order management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <DashboardSidebar />
              <main className="flex-1">
                {children}
                </main>
            </div>
          </SidebarProvider>
      </body>
    </html>
  )
}

