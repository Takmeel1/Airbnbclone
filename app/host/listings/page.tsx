"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { Plus, Edit, Trash2, Eye, Star, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"

export default function HostListingsPage() {
  const { user } = useAuth()

  const [listings] = useState([
    {
      id: 1,
      title: "Modern Loft in Koramangala",
      location: "Bangalore, Karnataka",
      price: 9000,
      rating: 4.8,
      reviews: 23,
      bookings: 15,
      earnings: 135000,
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
      description: "Beautiful modern loft in the heart of Bangalore with amazing city views.",
    },
    {
      id: 2,
      title: "Cozy Mountain Cabin",
      location: "Shimla, Himachal Pradesh",
      price: 7500,
      rating: 4.9,
      reviews: 18,
      bookings: 12,
      earnings: 90000,
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
      description: "Peaceful mountain retreat perfect for nature lovers and outdoor enthusiasts.",
    },
    {
      id: 3,
      title: "Beach House Paradise",
      location: "Goa, India",
      price: 18000,
      rating: 4.7,
      reviews: 31,
      bookings: 8,
      earnings: 144000,
      status: "inactive",
      image: "/placeholder.svg?height=200&width=300",
      description: "Stunning beachfront property with direct ocean access and sunset views.",
    },
  ])

  if (!user || user.role !== "host") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Access denied. Host account required.</p>
        </div>
      </div>
    )
  }

  const totalEarnings = listings.reduce((sum, listing) => sum + listing.earnings, 0)
  const totalBookings = listings.reduce((sum, listing) => sum + listing.bookings, 0)
  const activeListings = listings.filter((listing) => listing.status === "active").length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
              <p className="text-gray-600">Manage your properties and track performance</p>
            </div>
            <Link href="/host/listings/new">
              <Button className="mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-600">${totalEarnings.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-blue-600">{totalBookings}</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Listings</p>
                    <p className="text-2xl font-bold text-purple-600">{activeListings}</p>
                  </div>
                  <Plus className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                    <span className="text-gray-400">Property Image</span>
                  </div>
                  <Badge
                    className={`absolute top-3 right-3 ${
                      listing.status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {listing.status}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{listing.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{listing.rating}</span>
                        <span className="text-gray-500 ml-1">({listing.reviews})</span>
                      </div>
                      <span className="font-bold text-lg">₹{listing.price}/night</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Bookings:</span>
                        <span className="font-medium ml-1">{listing.bookings}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Earned:</span>
                        <span className="font-medium text-green-600 ml-1">₹{listing.earnings}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {listings.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Plus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-4">Start earning by adding your first property listing</p>
                <Link href="/host/listings/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
