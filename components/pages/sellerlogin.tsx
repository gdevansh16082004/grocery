"use client"

import { useState } from "react"
import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SellerRegistrationForm() {
  const [activeTab, setActiveTab] = useState("register")

  return (
    <Card className="w-full max-w-md shadow-md">
      <Tabs defaultValue="register" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">Register Your Store</CardTitle>
            <CardDescription>Create a seller account to start selling your products on our platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name" className="text-slate-700">
                Store Name
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input id="store-name" placeholder="Your Store Name" className="pl-10 rounded-md border-slate-300" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-slate-700">
                Address
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input id="address" placeholder="Store Address" className="pl-10 rounded-md border-slate-300" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-slate-700">
                Contact Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="contact"
                  type="tel"
                  placeholder="Contact Number"
                  className="pl-10 rounded-md border-slate-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours" className="text-slate-700">
                Operating Hours
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input id="hours" placeholder="e.g. 9:00 AM - 6:00 PM" className="pl-10 rounded-md border-slate-300" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 rounded-md border-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <Input id="password" type="password" placeholder="••••••••" className="rounded-md border-slate-300" />
            </div>
          </CardContent>
          <CardFooter className="flex mt-2 flex-col space-y-4">
            <Button className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2">
              Register Store
            </Button>
            <p className="text-sm text-slate-600 text-center">
              Already have an account?{" "}
              <Button variant="link" className="p-0 text-gray-900 font-medium" onClick={() => setActiveTab("login")}>
                Login
              </Button>
            </p>
          </CardFooter>
        </TabsContent>
        <TabsContent value="login">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">Seller Login</CardTitle>
            <CardDescription>Login to your seller account to manage your store.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-slate-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 rounded-md border-slate-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <Input id="password" type="password" placeholder="••••••••" className="rounded-md border-slate-300" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2">Login</Button>
            <p className="text-sm text-slate-600 text-center">
              Don&apos;t have an account?{" "}
              <Button variant="link" className="p-0 text-gray-900 font-medium" onClick={() => setActiveTab("register")}>
                Register
              </Button>
            </p>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

