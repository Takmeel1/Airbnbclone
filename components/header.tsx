"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Menu, User, Home, Search, Plus } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { AuthModal } from "@/components/auth-modal"

export function Header() {
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StayNest</span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2 rounded-full border border-gray-300 px-4 py-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <span className="text-sm font-medium">Anywhere</span>
              <div className="h-4 w-px bg-gray-300" />
              <span className="text-sm font-medium">Any week</span>
              <div className="h-4 w-px bg-gray-300" />
              <span className="text-sm text-gray-600">Add guests</span>
              <div className="ml-2 rounded-full bg-primary p-2">
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {user?.role === "host" && (
                <Link href="/host/listings">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Plus className="h-4 w-4 mr-2" />
                    Add listing
                  </Button>
                </Link>
              )}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 rounded-full border border-gray-300 px-3 py-2"
                    >
                      <Menu className="h-4 w-4" />
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user.role === "guest" ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/bookings">My bookings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/wishlist">
                            <Heart className="h-4 w-4 mr-2" />
                            Wishlist
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/host/listings">My listings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/host/bookings">Booking requests</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 rounded-full border border-gray-300 px-3 py-2"
                  onClick={() => setShowAuthModal(true)}
                >
                  <Menu className="h-4 w-4" />
                  <User className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  )
}
