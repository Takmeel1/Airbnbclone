"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Camera, Star, MapPin, Calendar } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    location: "",
  })

  const mockBookings = [
    {
      id: 1,
      property: "Cozy Apartment in Bandra",
      location: "Mumbai, Maharashtra",
      dates: "Dec 15-20, 2024",
      status: "upcoming",
      price: 40000,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      property: "Beachfront Villa in North Goa",
      location: "Goa, India",
      dates: "Nov 10-17, 2024",
      status: "completed",
      price: 105000,
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const mockListings = [
    {
      id: 1,
      title: "Modern Loft in Koramangala",
      location: "Bangalore, Karnataka",
      price: 9000,
      rating: 4.8,
      bookings: 23,
      earnings: 207000,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Cozy Mountain Cabin",
      location: "Shimla, Himachal Pradesh",
      price: 7500,
      rating: 4.9,
      bookings: 18,
      earnings: 135000,
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    {user.role === "host" ? "Host" : "Guest"}
                  </Badge>
                </div>

                <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue={user.role === "guest" ? "bookings" : "listings"} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              {user.role === "guest" ? (
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              ) : (
                <TabsTrigger value="listings">My Listings</TabsTrigger>
              )}
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Add your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Add your location"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {user.role === "guest" ? (
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>View your upcoming and past bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="h-20 w-28 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">Property</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{booking.property}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {booking.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {booking.dates}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={booking.status === "upcoming" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                            <p className="text-lg font-semibold mt-2">₹{booking.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ) : (
              <TabsContent value="listings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Listings</CardTitle>
                    <CardDescription>Manage your property listings and view performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockListings.map((listing) => (
                        <div key={listing.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="h-20 w-28 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">Property</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{listing.title}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {listing.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                              {listing.rating} • {listing.bookings} bookings
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">₹{listing.price}/night</p>
                            <p className="text-sm text-green-600">+₹{listing.earnings} earned</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                  <CardDescription>
                    {user.role === "guest" ? "Reviews you've written" : "Reviews from your guests"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No reviews yet</p>
                    <p className="text-sm">
                      {user.role === "guest"
                        ? "Start booking to leave reviews"
                        : "Host your first property to receive reviews"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
