import type { Product, Store } from "@/lib/types"

export function getStores(): Store[] {
  return [
    {
      id: "store-1",
      name: "Fresh Market",
      logo: "/placeholder.svg?height=300&width=600",
      address: "123 Main Street, Cityville",
      isOpen: true,
      distance: "0.5 miles",
    },
    {
      id: "store-2",
      name: "Campus Grocery",
      logo: "/placeholder.svg?height=300&width=600",
      address: "456 University Ave, College Town",
      isOpen: true,
      distance: "0.2 miles",
    },
    {
      id: "store-3",
      name: "Value Mart",
      logo: "/placeholder.svg?height=300&width=600",
      address: "789 Budget Blvd, Savingsville",
      isOpen: true,
      distance: "1.2 miles",
    },
    {
      id: "store-4",
      name: "Organic Oasis",
      logo: "/placeholder.svg?height=300&width=600",
      address: "101 Health Lane, Greenville",
      isOpen: false,
      distance: "2.5 miles",
    },
    {
      id: "store-5",
      name: "Quick Stop",
      logo: "/placeholder.svg?height=300&width=600",
      address: "202 Convenience Road, Fasttown",
      isOpen: true,
      distance: "0.8 miles",
    },
    {
      id: "store-6",
      name: "International Foods",
      logo: "/placeholder.svg?height=300&width=600",
      address: "303 Global Street, Worldville",
      isOpen: true,
      distance: "1.7 miles",
    },
  ]
}

export function getStoreById(storeId: string): Store | undefined {
  return getStores().find((store) => store.id === storeId)
}

export function getProducts(storeId?: string): Product[] {
  const allProducts = [
    {
      id: "1",
      name: "Organic Bananas",
      description: "Sweet and nutritious organic bananas, perfect for smoothies or a quick snack.",
      price: 1.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Fruits",
      storeId: "store-1",
    },
    {
      id: "2",
      name: "Fresh Avocados",
      description: "Ripe and ready-to-eat avocados, great for guacamole or toast.",
      price: 2.49,
      image: "/placeholder.svg?height=300&width=300",
      category: "Fruits",
      storeId: "store-1",
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
      storeId: "store-1",
    },
    {
      id: "4",
      name: "Greek Yogurt",
      description: "Thick and creamy Greek yogurt, high in protein and perfect for breakfast.",
      price: 4.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Dairy",
      storeId: "store-1",
    },
    {
      id: "5",
      name: "Sliced Bread",
      description: "Soft and fluffy sliced bread, perfect for sandwiches or toast.",
      price: 2.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Bakery",
      storeId: "store-2",
    },
    {
      id: "6",
      name: "Chocolate Chip Cookies",
      description: "Delicious chocolate chip cookies, freshly baked and ready to enjoy.",
      price: 3.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Bakery",
      storeId: "store-2",
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
      storeId: "store-2",
    },
    {
      id: "8",
      name: "Mixed Nuts",
      description: "A delicious blend of premium nuts, great for a healthy snack.",
      price: 5.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Snacks",
      storeId: "store-2",
    },
    {
      id: "9",
      name: "Chicken Breast",
      description: "Fresh boneless, skinless chicken breast, perfect for grilling or baking.",
      price: 7.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Meat",
      storeId: "store-3",
    },
    {
      id: "10",
      name: "Ground Beef",
      description: "Lean ground beef, perfect for burgers, tacos, or pasta sauce.",
      price: 6.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Meat",
      storeId: "store-3",
    },
    {
      id: "11",
      name: "Broccoli",
      description: "Fresh broccoli florets, packed with nutrients and perfect for stir-fries.",
      price: 1.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Vegetables",
      storeId: "store-3",
    },
    {
      id: "12",
      name: "Carrots",
      description: "Crisp and sweet carrots, great for snacking or cooking.",
      price: 1.49,
      originalPrice: 1.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Vegetables",
      onSale: true,
      storeId: "store-3",
    },
  ]

  if (storeId) {
    return allProducts.filter((product) => product.storeId === storeId)
  }

  return allProducts
}