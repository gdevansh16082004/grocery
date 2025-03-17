import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CartProvider } from "@/components/userComponents/cart/cart-context"
import { OrderProvider } from "@/components/userComponents/orders/order-context"
import { Header } from "@/components/userComponents/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fresh Groceries",
  description: "Your one-stop shop for fresh groceries",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <OrderProvider>
            <Header />
            {children}
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  )
}

