"use client"

import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import toast from "react-hot-toast"

export default function AddProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  })

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Toys & Games",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Automotive",
    "Health & Wellness",
    "Jewelry",
    "Food & Beverages",
    "Office Supplies",
    "Pet Supplies",
    "Arts & Crafts",
    "Other",
  ]

  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setProductData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return toast.error("Please upload an image")

    setLoading(true)


    console.log("Product Data:", productData)
console.log("Image:", image)


    try {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("name", productData.name)
      formData.append("price", productData.price)
      formData.append("quantity", productData.quantity)
      formData.append("category", productData.category)
      formData.append("description", productData.description)
      

      const res = await axios.post("/api/Seller/AddProduct", formData )


      toast.success("Item added successfully!")
      console.log("Response:", res.data)

      // Reset the form
      setProductData({ name: "", description: "", price: "", quantity: "", category: "" })
      setImage(null)
      setImagePreview(null)
    } catch (error) {
      console.error("Error uploading product:", error)
      toast.error("Failed to upload product")
    } finally {
      setLoading(false)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={productData.name} onChange={handleInputChange} required className="rounded-xl" />
            </div>

            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" name="price" type="number" step="1" min="0" value={productData.price} onChange={handleInputChange} required className="rounded-xl" />
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" type="number" min="1" value={productData.quantity} onChange={handleInputChange} required className="rounded-xl" />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={productData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category" className="rounded-xl">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                required
                className="h-[158px] rounded-xl"
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Product Image</Label>
          {!imagePreview ? (
            <div
              {...getRootProps()}
              className={`mt-1 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Drag & drop an image here, or click to select</p>
              <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG or GIF up to 5MB</p>
            </div>
          ) : (
            <Card className="mt-1 p-2 rounded-xl overflow-hidden">
              <div className="relative">
                <img src={imagePreview} alt="Product preview" className="w-full h-64 object-contain rounded-lg" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button type="button" size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm" onClick={removeImage}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full md:w-auto md:px-12 rounded-full mt-8" disabled={loading}>
          {loading ? "Uploading..." : "Save Product"}
        </Button>
      </form>
    </div>
  )
}
