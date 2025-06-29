"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import { useState } from "react"

export function Hero() {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  })

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="h-[60vh] md:h-[70vh] bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find your next stay</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">Discover unique places to stay around the world</p>
        </div>
      </div>

      {/* Search Card */}
      <div className="relative -mt-8 mx-4 md:mx-8 lg:mx-auto lg:max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Where</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search destinations"
                  className="pl-10 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Check in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Check out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Add guests"
                  className="pl-10 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-8"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
