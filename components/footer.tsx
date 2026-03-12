import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Book Us", href: "/booking" },
  ],
  social: [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "YouTube", href: "#", icon: Youtube },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold">Sumaj Tusuy</h3>
            <p className="mt-1 text-sm text-primary-foreground/80">
              &quot;Beautiful Dance&quot; in Quechua
            </p>
            <p className="mt-4 text-sm text-primary-foreground/80 max-w-md">
              Celebrating the rich cultural heritage of Peru through traditional dance performances. 
              Available for weddings, corporate events, festivals, and private celebrations.
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Contact Us</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@sumajtusuy.com" className="hover:text-primary-foreground transition-colors">
                  info@sumajtusuy.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+15551234567" className="hover:text-primary-foreground transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>Los Angeles, California</span>
              </li>
            </ul>
          </div>
          
          {/* Links & Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider">Follow Us</h4>
            <div className="mt-4 flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Sumaj Tusuy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
