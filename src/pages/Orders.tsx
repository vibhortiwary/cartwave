import { Link } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Orders = () => {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 1299.99,
      items: [
        { name: "MacBook Pro 14", price: 1299.99, quantity: 1 }
      ],
      tracking: "1Z999AA1234567890"
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      status: "Shipped",
      total: 899.99,
      items: [
        { name: "iPhone 15 Pro", price: 899.99, quantity: 1 }
      ],
      tracking: "1Z999AA1234567891"
    },
    {
      id: "ORD-003",
      date: "2024-01-05", 
      status: "Processing",
      total: 299.99,
      items: [
        { name: "AirPods Pro", price: 299.99, quantity: 1 }
      ],
      tracking: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "Processing":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <CardTitle className="text-lg">Order {order.id}</CardTitle>
                        <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <span className="text-lg font-semibold">₹{order.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span>{item.name} x{item.quantity}</span>
                            <span className="font-medium">₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {order.tracking && (
                          <Button variant="outline" size="sm">
                            Track Package
                          </Button>
                        )}
                        {order.status === "Delivered" && (
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            Review
                          </Button>
                        )}
                      </div>
                      {order.tracking && (
                        <div className="text-sm text-gray-600">
                          Tracking: {order.tracking}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {orders.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                <Link to="/products">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders; 