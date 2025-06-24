import { Link } from "react-router-dom";
import { ArrowLeft, Gift, Star, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Rewards = () => {
  const userPoints = 1250;
  const nextTier = 2000;
  const progress = (userPoints / nextTier) * 100;

  const rewards = [
    {
      id: 1,
      name: "₹500 Off Next Purchase",
      points: 1000,
      description: "Get ₹500 off your next order of ₹2000 or more",
      available: true,
      claimed: false
    },
    {
      id: 2,
      name: "Free Shipping",
      points: 500,
      description: "Free shipping on your next order",
      available: true,
      claimed: false
    },
    {
      id: 3,
      name: "20% Off Electronics",
      points: 1500,
      description: "20% discount on all electronics",
      available: false,
      claimed: false
    },
    {
      id: 4,
      name: "Premium Support",
      points: 2000,
      description: "Priority customer support for 30 days",
      available: false,
      claimed: false
    }
  ];

  const history = [
    {
      id: 1,
      action: "Earned Points",
      points: 250,
      date: "2024-01-15",
      description: "Purchase: MacBook Pro 14"
    },
    {
      id: 2,
      action: "Redeemed Reward",
      points: -500,
      date: "2024-01-10",
      description: "Free Shipping Coupon"
    },
    {
      id: 3,
      action: "Earned Points",
      points: 100,
      date: "2024-01-05",
      description: "Product Review"
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
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Rewards & Loyalty</h1>

          {/* Points Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Your Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{userPoints}</div>
                  <div className="text-sm text-gray-600">Current Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">Gold</div>
                  <div className="text-sm text-gray-600">Current Tier</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{nextTier - userPoints}</div>
                  <div className="text-sm text-gray-600">Points to Next Tier</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to Platinum</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Rewards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rewards</h2>
              <div className="space-y-4">
                {rewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Gift className="h-5 w-5 text-purple-500" />
                            <h3 className="font-semibold">{reward.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{reward.points} points</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {reward.available ? (
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Redeem
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              Need {reward.points - userPoints} more points
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Points History */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Points History</h2>
              <div className="space-y-4">
                {history.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {item.points > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <Gift className="h-4 w-4 text-purple-500" />
                            )}
                            <span className="font-medium">{item.action}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <div className={`text-right font-semibold ${item.points > 0 ? 'text-green-600' : 'text-purple-600'}`}>
                          {item.points > 0 ? '+' : ''}{item.points} pts
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* How to Earn */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Make Purchases</h3>
                  <p className="text-sm text-gray-600">Earn 1 point for every ₹100 spent</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Write Reviews</h3>
                  <p className="text-sm text-gray-600">Earn 100 points per review</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Refer Friends</h3>
                  <p className="text-sm text-gray-600">Earn 500 points per referral</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards; 