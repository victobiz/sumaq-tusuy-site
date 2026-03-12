"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "festival", label: "Festival / Fair" },
  { value: "private", label: "Private Party" },
  { value: "school", label: "School / Educational" },
  { value: "other", label: "Other" },
]

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
            Thank You for Your Inquiry!
          </h3>
          <p className="text-muted-foreground mb-6">
            We&apos;ve received your booking request and will get back to you within 24-48 hours 
            to discuss your event details.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setSubmitted(false)}
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto border-0 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="font-serif text-2xl">Request a Performance</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll get back to you with availability and pricing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Your name" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                placeholder="(555) 123-4567" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <Input 
                id="eventDate" 
                name="eventDate" 
                type="date" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type *</Label>
              <Select name="eventType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Event Location *</Label>
              <Input 
                id="location" 
                name="location" 
                placeholder="City, State or Venue" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guests">Estimated Number of Guests</Label>
            <Input 
              id="guests" 
              name="guests" 
              type="number" 
              placeholder="100" 
              min="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Tell Us About Your Event *</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="Please share details about your event, any specific dances you're interested in, and any other requirements..."
              rows={5}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit Request"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By submitting this form, you agree to be contacted about your booking inquiry.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
