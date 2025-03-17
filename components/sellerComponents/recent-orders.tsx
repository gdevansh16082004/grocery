import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "ORD-001",
    customer: "Alex Johnson",
    amount: "$129.99",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    customer: "Sarah Williams",
    amount: "$89.50",
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    amount: "$245.00",
    status: "Pending",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    amount: "$74.99",
    status: "Canceled",
  },
  {
    id: "ORD-005",
    customer: "James Wilson",
    amount: "$189.99",
    status: "Delivered",
  },
]

export function RecentOrders() {
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
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
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

