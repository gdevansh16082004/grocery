"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams)

    if (category === currentCategory) {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button
          variant={!currentCategory ? "default" : "outline"}
          className="justify-start"
          onClick={() => handleCategoryClick("")}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={currentCategory === category ? "default" : "outline"}
            className="justify-start"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

