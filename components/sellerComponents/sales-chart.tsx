"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Jan", sales: 4000, orders: 2400 },
  { name: "Feb", sales: 3000, orders: 1398 },
  { name: "Mar", sales: 2000, orders: 9800 },
  { name: "Apr", sales: 2780, orders: 3908 },
  { name: "May", sales: 1890, orders: 4800 },
  { name: "Jun", sales: 2390, orders: 3800 },
  { name: "Jul", sales: 3490, orders: 4300 },
]

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Compare sales and orders over time</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
}

