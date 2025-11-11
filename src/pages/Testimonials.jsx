import React from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Testimonial } from '../components/Testimonial.jsx'
import { Button } from '../components/Button.jsx'
import { testimonials } from '../data/testimonials.js'

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-5xl px-6 py-12 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading
            eyebrow="Testimonials"
            title="Stories across continents."
            description="Designers, architects, hoteliers, and developers worldwide use Eirén to launch modern natural luxury experiences."
          />
          <Link to="/" className="shrink-0">
            <Button variant="outline">Back to studio</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map(testimonial => (
            <Testimonial
              key={testimonial.name}
              quote={testimonial.quote}
              name={testimonial.name}
              className="h-full bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
