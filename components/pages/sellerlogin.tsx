"use client";

import { useState } from "react";
// import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SellerRegistrationForm() {
  const [activeTab, setActiveTab] = useState("register");

  // State for registration
  const [formData, setFormData] = useState({
    storename: "",
    address: "",
    contact: "",
    hours: "",
    email: "",
    password: "",
  });

  // State for login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async () => {
    try {
      if (!formData.storename || !formData.email || !formData.password) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const response = await axios.post("/api/selregister", {
        name: formData.storename,
        address: formData.address,
        contact: formData.contact,
        operatingHours: formData.hours,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        toast.success("Seller registered successfully!");
        // Router.push('/sellerDashboard')
        // setActiveTab("login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Error registering seller. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      if (!loginData.email || !loginData.password) {
        toast.error("Please enter email and password.");
        return;
      }

      const response = await axios.post("/api/selogin", {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        // Router.push('/sellerDashboard');
        // Redirect or store session token as needed

      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password.");
    }
  };

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
            {["storename", "address", "contact", "hours", "email", "password"].map((field, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={field} className="text-slate-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                </Label>
                <Input
                  id={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field === "hours" ? "e.g. 9:00 AM - 6:00 PM" : `Enter ${field}`}
                  className="rounded-md border-slate-300"
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex mt-2 flex-col space-y-4">
            <Button onClick={handleSignup} className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2">
              Register Store
            </Button>
          </CardFooter>
        </TabsContent>
        <TabsContent value="login">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">Seller Login</CardTitle>
            <CardDescription>Login to your seller account to manage your store.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["email", "password"].map((field, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={field} className="text-slate-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  type={field === "password" ? "password" : "email"}
                  placeholder={`Enter ${field}`}
                  className="rounded-md border-slate-300"
                  value={loginData[field as keyof typeof loginData]}
                  onChange={handleLoginChange}
                />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button onClick={handleLogin} className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2">
              Login
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
