import React from 'react'
import { Button } from './Button.jsx'
import { Input } from './Input.jsx'
import { SectionHeading } from './SectionHeading.jsx'

export const RequestQuote = () => (
  <section
    id="quote"
    className="space-y-8 rounded-3xl border border-nude/60 bg-cream/70 p-8 shadow-mild"
  >
    <SectionHeading
      eyebrow="Request a quote"
      title="Tell us about your space."
      description="Share your vision and we’ll start bringing it to life."
    />
    <form className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Name" placeholder="Full name" required />
        <Input label="Email" placeholder="you@home.com" type="email" required />
      </div>
      <Input label="Phone" placeholder="(555) 123-4567" type="tel" />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[color:var(--fg)]">Project details</label>
        <textarea
          className="min-h-[140px] w-full rounded-2xl border border-nude/60 bg-white/80 p-4 text-sm text-[color:var(--fg)] outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
          placeholder="Describe how you’ll use the space, preferred Techo-Bloc products, and any must-have features."
          required
        />
      </div>
      <div className="text-right">
        <Button size="lg" type="submit" variant="primary">
          Submit request
        </Button>
      </div>
    </form>
  </section>
)
