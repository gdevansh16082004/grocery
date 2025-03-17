


import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"


interface StoreCardProps {
  store: {
    _id: string
    name: string;
    
    email: string
  
  
    address: string
    operatingHours: string,
    contact: string,
    
  };
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{store.name}</h3>
        <p className="text-muted-foreground mb-4">{store.email}</p>
        <p className="text-muted-foreground mb-4">{store.operatingHours}</p>
        <p className="text-muted-foreground mb-4">{store.address}</p>
        <p className="text-muted-foreground mb-4">{store.contact}</p>
       
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/userDashboard/store/${store._id}`} className="w-full">
          <Button className="w-full" >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Store
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

