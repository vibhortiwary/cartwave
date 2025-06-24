import { Link } from "react-router-dom";
import { ArrowLeft, Gift, CreditCard, Send, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GiftCards = () => {
  const giftCardBalance = 150.00;
  
  const availableCards = [
    {
      id: 1,
      name: "Birthday Gift Card",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
      amounts: [1000, 2000, 5000, 10000],
      description: "Perfect for birthdays and celebrations"
    },
    {
      id: 2,
      name: "Holiday Gift Card",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300",
      amounts: [2000, 5000, 10000, 25000],
      description: "Spread holiday cheer with our special cards"
    },
    {
      id: 3,
      name: "Thank You Gift Card",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
      amounts: [1000, 2000, 3000, 5000],
      description: "Show appreciation with a thoughtful gift"
    }
  ];

  const purchasedCards = [
    {
      id: 1,
      code: "GC-1234-5678-9012",
      amount: 5000.00,
      balance: 3750.00,
      purchased: "2024-01-10",
      expires: "2025-01-10"
    },
    {
      id: 2,
      code: "GC-9876-5432-1098",
      amount: 2000.00,
      balance: 0.00,
      purchased: "2024-01-05",
      expires: "2025-01-05"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Gift Cards</h1>

          {/* Gift Card Balance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-purple-500" />
                Your Gift Card Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">₹{giftCardBalance.toLocaleString('en-IN')}</div>
                <p className="text-gray-600 mb-4">Available for purchases</p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Use Gift Card
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Purchase Gift Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchase Gift Cards</h2>
              <div className="space-y-6">
                {availableCards.map((card) => (
                  <Card key={card.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{card.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                          
                          <div className="space-y-4">
                            <div>
                              <Label>Select Amount</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose amount" />
                                </SelectTrigger>
                                <SelectContent>
                                  {card.amounts.map((amount) => (
                                    <SelectItem key={amount} value={amount.toString()}>
                                      ₹{amount.toLocaleString('en-IN')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                                <Send className="h-4 w-4 mr-2" />
                                Send to Friend
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Your Gift Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Gift Cards</h2>
              <div className="space-y-4">
                {purchasedCards.map((card) => (
                  <Card key={card.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-blue-500" />
                          <span className="font-mono text-sm">{card.code}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{card.balance.toLocaleString('en-IN')}</div>
                          <div className="text-xs text-gray-500">of ₹{card.amount.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500 mb-3">
                        <span>Purchased: {new Date(card.purchased).toLocaleDateString()}</span>
                        <span>Expires: {new Date(card.expires).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        {card.balance > 0 ? (
                          <Button size="sm" className="flex-1">
                            Use Card
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="flex-1" disabled>
                            Used
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {purchasedCards.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No gift cards yet</h3>
                    <p className="text-gray-600 mb-4">Purchase a gift card to see it here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Plus className="h-6 w-6" />
                  <span>Buy Gift Card</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Send className="h-6 w-6" />
                  <span>Send Gift Card</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Download className="h-6 w-6" />
                  <span>Download Cards</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GiftCards; 