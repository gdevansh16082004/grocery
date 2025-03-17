"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useCart } from "./cart/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product)

    // Show success state briefly
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.onSale && <Badge className="absolute top-2 right-2 bg-red-500">Sale</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-medium line-clamp-2">{product.name}</h3>
          <div className="text-right">
            {product.onSale && (
              <span className="text-sm line-through text-muted-foreground mr-2">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
            <span className={cn("font-bold", product.onSale && "text-red-500")}>${product.price.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={isAdding}
          // variant={isAdding ? "success" : "default"}
        >
          {isAdding ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

