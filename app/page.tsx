import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SearchSection } from "@/components/search-section"
import { FeaturedListings } from "@/components/featured-listings"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SearchSection />
      <FeaturedListings />
      <Footer />
    </div>
  )
}
