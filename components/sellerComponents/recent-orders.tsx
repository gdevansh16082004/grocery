import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


interface IOrders {
  
    //  _id: new ObjectId('67d863216c37e14eeb046133'),
    
  
    bill: number
    deliverySlot: String
    address: String
    
    status: String;
    
  
}
interface RecentOrdersProps {
  orders: IOrders[]; // Accept an object with an orders array
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Slot</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order:IOrders) => (
              <TableRow key={order.bill}>
                <TableCell className="font-medium">{order.deliverySlot}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.bill}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      order.status === "Delivered"
                        ? "border-emerald-500 text-emerald-500"
                        : order.status === "Processing"
                          ? "border-blue-500 text-blue-500"
                          : order.status === "Pending"
                            ? "border-amber-500 text-amber-500"
                            : "border-red-500 text-red-500"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

