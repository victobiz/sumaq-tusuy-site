import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { DanceShowcase } from "@/components/dance-showcase"
import { FeaturedEvents } from "@/components/featured-events"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <DanceShowcase />
      <FeaturedEvents />
      <Testimonials />
      <CTASection />
    </>
  )
}
