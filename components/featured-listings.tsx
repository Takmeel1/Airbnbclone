"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Star, MapPin, Users, Wifi, Car, Coffee } from "lucide-react"
import { useState } from "react"

const featuredListings = [
  {
    id: 1,
    title: "Cozy Apartment in Bandra",
    location: "Mumbai, Maharashtra",
    price: 8000,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=250&width=400",
    host: "Priya",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Wifi", "Kitchen", "Parking"],
    isWishlisted: false,
  },
  {
    id: 2,
    title: "Beachfront Villa in North Goa",
    location: "Goa, India",
    price: 15000,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=250&width=400",
    host: "Arjun",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ["Pool", "Beach access", "Wifi"],
    isWishlisted: false,
  },
  {
    id: 3,
    title: "Mountain Cottage in Manali",
    location: "Himachal Pradesh, India",
    price: 12000,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=250&width=400",
    host: "Rajesh",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Fireplace", "Mountain view", "Hiking"],
    isWishlisted: false,
  },
  {
    id: 4,
    title: "Modern Loft in Cyber City",
    location: "Gurgaon, Haryana",
    price: 6000,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=250&width=400",
    host: "Sneha",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Metro access", "Workspace"],
    isWishlisted: false,
  },
  {
    id: 5,
    title: "Heritage Haveli Suite",
    location: "Jaipur, Rajasthan",
    price: 20000,
    rating: 5.0,
    reviews: 43,
    image: "/placeholder.svg?height=250&width=400",
    host: "Vikram",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Heritage view", "Balcony", "Cultural tours"],
    isWishlisted: false,
  },
  {
    id: 6,
    title: "Backwater Houseboat",
    location: "Alleppey, Kerala",
    price: 18000,
    rating: 4.8,
    reviews: 92,
    image: "/placeholder.svg?height=250&width=400",
    host: "Ravi",
    guests: 10,
    bedrooms: 5,
    bathrooms: 3,
    amenities: ["Backwater view", "Traditional meals", "Boat ride"],
    isWishlisted: false,
  },
]

export function FeaturedListings() {
  const [listings, setListings] = useState(featuredListings)

  const toggleWishlist = (id: number) => {
    setListings(
      listings.map((listing) => (listing.id === id ? { ...listing, isWishlisted: !listing.isWishlisted } : listing)),
    )
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-3 w-3" />
      case "parking":
        return <Car className="h-3 w-3" />
      case "kitchen":
        return <Coffee className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured stays</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked properties that offer exceptional experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="h-64 bg-gray-200 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Property Image</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(listing.id)
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${listing.isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </Button>
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">{listing.host}'s place</Badge>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                      <span className="text-sm text-gray-500">({listing.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{listing.guests} guests</span>
                    <span className="mx-2">•</span>
                    <span>{listing.bedrooms} bedrooms</span>
                    <span className="mx-2">•</span>
                    <span>{listing.bathrooms} bathrooms</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">₹{listing.price}</span>
                      <span className="text-gray-600"> / night</span>
                    </div>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                      Book now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent"
          >
            View all properties
          </Button>
        </div>
      </div>
    </section>
  )
}
