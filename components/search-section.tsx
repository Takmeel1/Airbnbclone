"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Plane, Building, TreePine, Waves, Mountain } from "lucide-react"

const destinations = [
  {
    name: "Goa",
    country: "India",
    image: "/placeholder.svg?height=200&width=300",
    icon: Waves,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Kerala",
    country: "India",
    image: "/placeholder.svg?height=200&width=300",
    icon: TreePine,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Jaipur",
    country: "Rajasthan, India",
    image: "/placeholder.svg?height=200&width=300",
    icon: Building,
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Manali",
    country: "Himachal Pradesh, India",
    image: "/placeholder.svg?height=200&width=300",
    icon: Mountain,
    color: "from-gray-500 to-slate-600",
  },
  {
    name: "Rishikesh",
    country: "Uttarakhand, India",
    image: "/placeholder.svg?height=200&width=300",
    icon: TreePine,
    color: "from-orange-500 to-yellow-600",
  },
  {
    name: "Mumbai",
    country: "Maharashtra, India",
    image: "/placeholder.svg?height=200&width=300",
    icon: Building,
    color: "from-purple-500 to-indigo-600",
  },
]

export function SearchSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore popular destinations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing places around the world and find your perfect getaway
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${destination.color} opacity-90`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <destination.icon className="h-16 w-16 text-white/80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-white/80 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.country}
                    </p>
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
            <Plane className="h-4 w-4 mr-2" />
            Explore all destinations
          </Button>
        </div>
      </div>
    </section>
  )
}
