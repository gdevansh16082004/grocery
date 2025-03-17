import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"


export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={store.logo || "/placeholder.svg"}
          alt={store.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{store.name}</h3>
        <p className="text-muted-foreground mb-4">{store.address}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className={`w-2 h-2 rounded-full ${store.isOpen ? "bg-green-500" : "bg-red-500"}`}></span>
          <span>{store.isOpen ? "Open Now" : "Closed"}</span>
          {store.distance && <span className="ml-auto">{store.distance} away</span>}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/store/${store.id}`} className="w-full">
          <Button className="w-full" disabled={!store.isOpen}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Store
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

