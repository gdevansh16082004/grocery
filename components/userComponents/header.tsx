import Link from "next/link"
import { Clock } from "lucide-react"
import { CartButton } from "./cart/cart-button"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Fresh Groceries
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/order-history">
            <Button variant="ghost" size="icon" className="relative">
              <Clock className="h-5 w-5" />
            </Button>
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  )
}

