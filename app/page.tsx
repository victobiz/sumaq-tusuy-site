import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { DanceShowcase } from "@/components/dance-showcase"
import { FeaturedEvents } from "@/components/featured-events"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { PeruStorySection } from "@/components/landing/peru-story-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <PeruStorySection />
      <DanceShowcase />
      <FeaturedEvents />
      <Testimonials />
      <CTASection />
    </>
  )
}
