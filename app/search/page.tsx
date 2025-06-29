"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, MapPin, Users, Filter, Search } from "lucide-react"

const mockListings = [
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
    amenities: ["WiFi", "Kitchen", "Parking"],
    propertyType: "apartment",
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
    amenities: ["Pool", "Beach access", "WiFi"],
    propertyType: "villa",
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
    propertyType: "cabin",
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
    amenities: ["WiFi", "Metro access", "Workspace"],
    propertyType: "loft",
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
    propertyType: "apartment",
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
    propertyType: "house",
    isWishlisted: false,
  },
]

export default function SearchPage() {
  const [listings, setListings] = useState(mockListings)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [0, 25000],
    propertyType: "",
    guests: "",
    amenities: [] as string[],
  })

  const toggleWishlist = (id: number) => {
    setListings(
      listings.map((listing) => (listing.id === id ? { ...listing, isWishlisted: !listing.isWishlisted } : listing)),
    )
  }

  const handleAmenityFilter = (amenity: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        amenities: [...filters.amenities, amenity],
      })
    } else {
      setFilters({
        ...filters,
        amenities: filters.amenities.filter((a) => a !== amenity),
      })
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesLocation = !filters.location || listing.location.toLowerCase().includes(filters.location.toLowerCase())

    const matchesPrice = listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1]

    const matchesType = !filters.propertyType || listing.propertyType === filters.propertyType

    const matchesGuests = !filters.guests || listing.guests >= Number.parseInt(filters.guests)

    const matchesAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.some((amenity) =>
        listing.amenities.some((listingAmenity) => listingAmenity.toLowerCase().includes(amenity.toLowerCase())),
      )

    return matchesLocation && matchesPrice && matchesType && matchesGuests && matchesAmenities
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{filteredListings.length} stays found</h1>
                <p className="text-gray-600">Discover amazing places around the world</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-80 space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label htmlFor="location-filter" className="text-base font-semibold">
                        Location
                      </Label>
                      <div className="relative mt-2">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="location-filter"
                          placeholder="Where are you going?"
                          className="pl-10"
                          value={filters.location}
                          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Price Range</Label>
                      <div className="mt-4 space-y-4">
                        <Slider
                          value={filters.priceRange}
                          onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                          max={25000}
                          step={500}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>₹{filters.priceRange[0]}</span>
                          <span>₹{filters.priceRange[1]}+</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Property Type</Label>
                      <Select onValueChange={(value) => setFilters({ ...filters, propertyType: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Any type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any type</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="cabin">Cabin</SelectItem>
                          <SelectItem value="loft">Loft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Guests</Label>
                      <Select onValueChange={(value) => setFilters({ ...filters, guests: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Any number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any number</SelectItem>
                          <SelectItem value="1">1 guest</SelectItem>
                          <SelectItem value="2">2 guests</SelectItem>
                          <SelectItem value="4">4+ guests</SelectItem>
                          <SelectItem value="8">8+ guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Amenities</Label>
                      <div className="mt-3 space-y-3">
                        {["WiFi", "Kitchen", "Parking", "Pool", "Beach access", "Mountain view"].map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={`amenity-${amenity}`}
                              checked={filters.amenities.includes(amenity)}
                              onCheckedChange={(checked) => handleAmenityFilter(amenity, checked as boolean)}
                            />
                            <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Listings Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
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
                            <Badge key={index} variant="secondary" className="text-xs">
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

              {filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
