import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Settings, Mail, MessageSquare, Smartphone, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Order Shipped",
      message: "Your order ORD-001 has been shipped and is on its way!",
      time: "2 hours ago",
      read: false,
      icon: "📦"
    },
    {
      id: 2,
      type: "promo",
      title: "Special Offer",
      message: "Get 20% off on all electronics this weekend!",
      time: "1 day ago",
      read: true,
      icon: "🎉"
    },
    {
      id: 3,
      type: "reward",
      title: "Points Earned",
      message: "You earned 250 points for your recent purchase!",
      time: "2 days ago",
      read: true,
      icon: "⭐"
    }
  ];

  const notificationSettings = [
    {
      category: "Orders & Shipping",
      settings: [
        { name: "Order confirmations", enabled: true },
        { name: "Shipping updates", enabled: true },
        { name: "Delivery notifications", enabled: true },
        { name: "Return status", enabled: false }
      ]
    },
    {
      category: "Promotions & Deals",
      settings: [
        { name: "Special offers", enabled: true },
        { name: "Flash sales", enabled: false },
        { name: "New product alerts", enabled: true },
        { name: "Price drop alerts", enabled: false }
      ]
    },
    {
      category: "Account & Security",
      settings: [
        { name: "Login alerts", enabled: true },
        { name: "Password changes", enabled: true },
        { name: "Account updates", enabled: false },
        { name: "Security alerts", enabled: true }
      ]
    },
    {
      category: "Rewards & Loyalty",
      settings: [
        { name: "Points earned", enabled: true },
        { name: "Rewards available", enabled: true },
        { name: "Tier status updates", enabled: false },
        { name: "Referral bonuses", enabled: true }
      ]
    }
  ];

  const deliveryMethods = [
    {
      name: "Email Notifications",
      icon: Mail,
      enabled: true,
      description: "Receive notifications via email"
    },
    {
      name: "Push Notifications",
      icon: Bell,
      enabled: true,
      description: "Get instant notifications on your device"
    },
    {
      name: "SMS Notifications",
      icon: Smartphone,
      enabled: false,
      description: "Receive text message notifications"
    },
    {
      name: "In-App Messages",
      icon: MessageSquare,
      enabled: true,
      description: "See notifications when you visit the app"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notification History */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{notification.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Badge className="bg-blue-500">New</Badge>
                              )}
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{notification.message}</p>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button size="sm" variant="outline">
                                <Check className="h-4 w-4 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <X className="h-4 w-4 mr-1" />
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {notifications.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-600">You're all caught up!</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Settings Sidebar */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Delivery Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-600">Receive notifications via email</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-gray-600">Get instant notifications</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Categories */}
              <div className="space-y-6">
                {notificationSettings.map((category) => (
                  <Card key={category.category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {category.settings.map((setting) => (
                        <div key={setting.name} className="flex items-center justify-between">
                          <span className="text-sm">{setting.name}</span>
                          <Switch checked={setting.enabled} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Bell className="h-5 w-5" />
                  <span className="text-xs">Enable All</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <X className="h-5 w-5" />
                  <span className="text-xs">Disable All</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Mail className="h-5 w-5" />
                  <span className="text-xs">Email Only</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Settings className="h-5 w-5" />
                  <span className="text-xs">Customize</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 