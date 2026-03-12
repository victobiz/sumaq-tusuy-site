import type { Metadata } from "next"
import { Mail, Phone, MapPin } from "lucide-react"
import { BookingForm } from "@/components/booking-form"

export const metadata: Metadata = {
  title: "Book a Performance | Sumaj Tusuy",
  description: "Book Sumaj Tusuy for your wedding, corporate event, festival, or private celebration. Experience authentic Peruvian dance performances.",
}

export default function BookingPage() {
  return (
    <div className="py-12 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            Book Us
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Bring Peru to Your Event
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to add the magic of Peruvian dance to your celebration? 
            Fill out the form below and we&apos;ll get back to you with a custom quote.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-primary-foreground rounded-xl p-8 sticky top-24">
              <h3 className="font-serif text-xl font-bold mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 mt-0.5 text-secondary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:info@sumajtusuy.com" 
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      info@sumajtusuy.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 mt-0.5 text-secondary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href="tel:+15551234567" 
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-0.5 text-secondary" />
                  <div>
                    <p className="font-medium">Based In</p>
                    <p className="text-primary-foreground/80">
                      Los Angeles, California<br />
                      <span className="text-sm">Available throughout CA</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6 border-primary-foreground/20" />
              
              <div>
                <h4 className="font-medium mb-3">What We Offer</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li>• Custom performance packages</li>
                  <li>• Multiple dance styles available</li>
                  <li>• Professional costumes included</li>
                  <li>• Interactive audience participation</li>
                  <li>• Cultural education workshops</li>
                </ul>
              </div>
              
              <hr className="my-6 border-primary-foreground/20" />
              
              <div>
                <h4 className="font-medium mb-3">Response Time</h4>
                <p className="text-sm text-primary-foreground/80">
                  We typically respond to all inquiries within 24-48 hours. 
                  For urgent requests, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
