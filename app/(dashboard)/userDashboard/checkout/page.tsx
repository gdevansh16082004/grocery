"use client"

import type React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Smartphone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/userComponents/cart/cart-context"
import { useOrders } from "@/components/userComponents/orders/order-context"
import { useRouter, useSearchParams } from "next/navigation"

const DELIVERY_SLOTS = [
  { id: "1", time: "Today, 2:00 PM - 4:00 PM" },
  { id: "2", time: "Today, 6:00 PM - 8:00 PM" },
  { id: "3", time: "Tomorrow, 10:00 AM - 12:00 PM" },
  { id: "4", time: "Tomorrow, 2:00 PM - 4:00 PM" },
]

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { addOrder } = useOrders()
  const router = useRouter()
  const searchParams = useSearchParams()
  const storeId = searchParams.get("storeId") || "store-1" // Default to store-1 if not specified

  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [deliverySlot, setDeliverySlot] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (items.length === 0 && !isComplete) {
      router.push("/cart")
    }
  }, [items.length, isComplete, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Calculate total with tax
    const total = subtotal + subtotal * 0.08

    try {
      await axios.post("/api/orders", {
        items,
        total,
        storeId,
        paymentMethod,
        deliverySlot,
      })

      // Add the order to history
      addOrder(items, total, storeId)
      setIsComplete(true)
      clearCart()
    } catch (error) {
      console.error("Order submission failed", error)
    } finally {
      setIsProcessing(false)
    }
  }


  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto my-4 bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Thank you for your order. We've received your payment and will start preparing your groceries.
            </p>
            <p className="text-muted-foreground mb-6">Your order will be delivered during your selected time slot.</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/order-history" className="w-full">
              <Button className="w-full">View Order History</Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/cart">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={deliverySlot}
                  onValueChange={setDeliverySlot}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {DELIVERY_SLOTS.map((slot) => (
                    <div key={slot.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={slot.id} id={`slot-${slot.id}`} required />
                      <Label htmlFor={`slot-${slot.id}`} className="flex-1 cursor-pointer p-2 rounded hover:bg-muted">
                        {slot.time}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 rounded border p-4">
                    <RadioGroupItem value="credit" id="payment-credit" />
                    <Label htmlFor="payment-credit" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded border p-4">
                    <RadioGroupItem value="upi" id="payment-upi" />
                    <Label htmlFor="payment-upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5" />
                      UPI Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded border p-4">
                    <RadioGroupItem value="razorpay" id="payment-razorpay" />
                    <Label htmlFor="payment-razorpay" className="flex items-center gap-2 cursor-pointer flex-1">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          fill="#072654"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.2 7.2H14.4C14.4 7.2 14.4 10.8 10.8 10.8C10.8 10.8 10.8 14.4 14.4 14.4V16.8H10.2C10.2 16.8 7.2 16.8 7.2 12C7.2 7.2 10.2 7.2 10.2 7.2Z"
                          fill="#3395FF"
                        />
                      </svg>
                      Razorpay
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="name@upi" />
                    </div>
                  </div>
                )}

                {paymentMethod === "razorpay" && (
                  <div className="mt-4 p-4 bg-muted rounded">
                    <p className="text-sm">You will be redirected to Razorpay to complete your payment securely.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(subtotal + subtotal * 0.08).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={!deliverySlot || isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

