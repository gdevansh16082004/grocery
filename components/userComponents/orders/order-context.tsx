"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type CartItem, useCart } from "@/components/userComponents/cart/cart-context"

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: "processing" | "delivered" | "cancelled"
  deliveryDate?: string
  storeId: string
}

interface OrderContextType {
  orders: Order[]
  addOrder: (items: CartItem[], total: number, storeId: string) => void
  reorder: (orderId: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const { addItem, clearCart } = useCart()

  // Load orders from localStorage on initial render
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error("Failed to parse orders from localStorage:", error)
      }
    } else {
      // Add some sample orders for demo purposes
      const sampleOrders = [
        {
          id: "order-" + Math.random().toString(36).substring(2, 10),
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          items: [
            {
              id: "1",
              name: "Organic Bananas",
              description: "Sweet and nutritious organic bananas, perfect for smoothies or a quick snack.",
              price: 1.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Fruits",
              quantity: 2,
            },
            {
              id: "3",
              name: "Whole Milk",
              description: "Creamy whole milk from grass-fed cows, perfect for drinking or cooking.",
              price: 3.99,
              originalPrice: 4.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Dairy",
              onSale: true,
              quantity: 1,
            },
          ],
          total: 8.52, // (1.99 * 2 + 3.99) * 1.08 (with tax)
          status: "delivered" as const,
          deliveryDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
          storeId: "store-1",
        },
        {
          id: "order-" + Math.random().toString(36).substring(2, 10),
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          items: [
            {
              id: "5",
              name: "Sliced Bread",
              description: "Soft and fluffy sliced bread, perfect for sandwiches or toast.",
              price: 2.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Bakery",
              quantity: 1,
            },
            {
              id: "7",
              name: "Potato Chips",
              description: "Crunchy potato chips, lightly salted and perfect for snacking.",
              price: 2.99,
              originalPrice: 3.49,
              image: "/placeholder.svg?height=300&width=300",
              category: "Snacks",
              onSale: true,
              quantity: 2,
            },
          ],
          total: 9.64, // (2.99 + 2.99 * 2) * 1.08 (with tax)
          status: "processing" as const,
          storeId: "store-2",
        },
      ]
      setOrders(sampleOrders)
      localStorage.setItem("orders", JSON.stringify(sampleOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addOrder = (items: CartItem[], total: number, storeId: string) => {
    const newOrder: Order = {
      id: "order-" + Math.random().toString(36).substring(2, 10),
      date: new Date().toISOString(),
      items,
      total,
      status: "processing",
      storeId,
    }

    setOrders((prevOrders) => [newOrder, ...prevOrders])
  }

  const reorder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order) return

    // Clear the cart first
    clearCart()

    // Add all items from the order to the cart
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addItem(item)
      }
    })

    // Navigate to the store page
    window.location.href = `/store/${order.storeId}`
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        reorder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}

