import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import { Card } from '../components/Card.jsx'
import { Input } from '../components/Input.jsx'
import { Badge } from '../components/Badge.jsx'
import { Alert } from '../components/Alert.jsx'
import { Toggle } from '../components/Toggle.jsx'
import { Select } from '../components/Select.jsx'
import { StatCard } from '../components/StatCard.jsx'
import { Testimonial } from '../components/Testimonial.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { testimonials } from '../data/testimonials.js'

const featureCards = [
  {
    title: 'Calibrated palettes',
    description: 'Toned color scales that feel tactile yet modern, ready for commerce and hospitality brands.'
  },
  {
    title: 'Layered depth',
    description: 'Soft drop shadows and rounded geometry for a crafted, editorial presentation.'
  },
  {
    title: 'Composable pieces',
    description: 'Buttons, badges, inputs, stats, and testimonials that stitch into full journeys.'
  },
  {
    title: 'Dark/light parity',
    description: 'Every surface reads in both daylight and night mode thanks to shared design tokens.'
  }
]

const statBlocks = [
  { label: 'Studios adopting', value: '280+' },
  { label: 'Components shipped', value: '46' },
  { label: 'Brand kits launched', value: '32' }
]

const documentEntries = [
  {
    title: 'Covenants',
    description: 'Summary of The Forest at Parkway HOA covenants, conditions, and restrictions.',
    action: 'View summary',
    href: '/documents/theforest_covenants_summary.md'
  },
  {
    title: 'Meeting Minutes',
    description: 'Yearly and quarterly board meeting notes for residents.',
    action: 'Browse archive',
    href: '#contact'
  },
  {
    title: 'Architectural guidelines',
    description: 'Application steps, material palettes, and review timelines.',
    action: 'Download guide',
    href: '#contact'
  }
]

export default function ComponentsPage() {
  const location = useLocation()
  const [newsletter, setNewsletter] = useState(true)
  const [handoff, setHandoff] = useState(false)
  const [plan, setPlan] = useState('studio')

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-20">
        <section id="hero" className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <Badge tone="nude">Heirloom-grade UI</Badge>
            <h1 className="text-4xl font-display font-semibold tracking-tight md:text-5xl">
              Craft bespoke luxury websites without starting from zero.
            </h1>
            <p className="text-lg text-[color:var(--fg)]/80">
              A component kit for hospitality, interior, and residential brands. Built with Tailwind, polished with calm gradients,
              and ready for your next estate launch.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">Preview live</Button>
              <Button variant="outline" size="lg">Download kit</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {statBlocks.map(stat => (
                <div key={stat.label} className="rounded-2xl border border-nude/50 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/60">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-gradient-to-b from-cream to-white shadow-deep">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-olive/70">Live preview</p>
              <Input label="Email" placeholder="you@atelier.com" />
              <Select
                label="Choose plan"
                value={plan}
                onChange={event => setPlan(event.target.value)}
                options={[
                  { value: 'studio', label: 'Studio — $38/mo' },
                  { value: 'atelier', label: 'Atelier — $64/mo' },
                  { value: 'estate', label: 'Estate — $92/mo' },
                ]}
              />
              <Toggle
                label="Send me launch notes"
                checked={newsletter}
                onChange={setNewsletter}
              />
              <Button size="lg" className="w-full">Start designing</Button>
            </div>
          </Card>
        </section>

        <section id="features" className="space-y-10">
          <SectionHeading
            eyebrow="Palette & polish"
            title="Layouts that feel tailored to boutique brands."
            description="Blend editorial typography, sun-baked neutrals, and bold masonry blocks. Every component nests well in both commerce and storytelling contexts."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map(feature => (
              <div key={feature.title} className="rounded-3xl border border-nude/50 bg-white/80 p-6 shadow-mild">
                <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-3 text-[color:var(--fg)]/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="library" className="space-y-10">
          <SectionHeading
            eyebrow="Component library"
            title="Mix & match primitives to sculpt your experience."
            description="Buttons, badges, alerts, and more—all sharing the same material system."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Buttons" subtitle="Variants & states">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="dark">Dark</Button>
              </div>
            </Card>

            <Card title="Inputs" subtitle="Form controls">
              <div className="space-y-4">
                <Input label="Email" placeholder="you@brand.com" />
                <Input label="Promo code" placeholder="NATURAL-LUX" hint="Applied at checkout" />
                <div className="flex gap-3">
                  <Button className="flex-1">Submit</Button>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </div>
              </div>
            </Card>

            <Card title="Badges & Alerts" subtitle="Tone utilities">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Olive</Badge>
                  <Badge tone="sage">Sage</Badge>
                  <Badge tone="nude">Nude</Badge>
                  <Badge tone="indigo">Indigo</Badge>
                </div>
                <Alert title="Saved" description="Your preferences are preserved across devices." />
                <Alert tone="nude" title="Low stock" description="A few items remain in this collection." />
              </div>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Workspace preferences" subtitle="Toggle suite">
              <div className="space-y-4">
                <Toggle
                  label="Studio newsletter"
                  description="Monthly drop with product tips and releases."
                  checked={newsletter}
                  onChange={setNewsletter}
                />
                <Toggle
                  label="Client handoff reports"
                  description="Automatically deliver build notes to collaborators."
                  checked={handoff}
                  onChange={setHandoff}
                />
              </div>
            </Card>
            <Card title="Plan selection" subtitle="Custom select control">
              <Select
                label="Choose plan"
                value={plan}
                onChange={event => setPlan(event.target.value)}
                options={[
                  { value: 'studio', label: 'Studio — $38/mo' },
                  { value: 'atelier', label: 'Atelier — $64/mo' },
                  { value: 'estate', label: 'Estate — $92/mo' },
                ]}
                hint="Flexible monthly billing, cancel anytime."
              />
              <div className="mt-4 rounded-2xl border border-nude/40 bg-white/70 p-4 text-sm text-[color:var(--fg)]/80">
                <p>
                  Selected plan:{' '}
                  <span className="font-semibold text-[color:var(--fg)]">{plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
                </p>
                <p>Includes premium support, brand-ready exports, and collaborative seats.</p>
              </div>
            </Card>
          </div>
        </section>

        <section id="documents" className="space-y-10">
          <SectionHeading
            eyebrow="Documents"
            title="Keep the community informed."
            description="Access governing documents, architectural expectations, and upcoming meeting records."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {documentEntries.map(doc => (
              <div key={doc.title} className="rounded-3xl border border-nude/50 bg-white/80 p-6 shadow-mild">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/60">
                  <span>{doc.title}</span>
                  <span className="h-1 w-8 rounded-full bg-olive/50" />
                </div>
                <p className="mt-3 text-[color:var(--fg)]/80">{doc.description}</p>
                <a
                  href={doc.href}
                  className="mt-5 inline-flex items-center text-sm font-medium text-olive underline-offset-4 hover:underline"
                  target={doc.href?.startsWith('http') || doc.href?.startsWith('/') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {doc.action}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-8 rounded-3xl border border-nude/60 bg-white/80 p-10 text-center shadow-mild">
          <SectionHeading
            eyebrow="Get access"
            title="Elevate your next hospitality site."
            description="Download the Modern Natural Luxury UI kit and start with the same foundation we use for boutique builds."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Purchase license</Button>
            <Button variant="outline" size="lg">Book a walkthrough</Button>
          </div>
        </section>

        <section id="insights" className="space-y-10">
          <SectionHeading
            eyebrow="Insights"
            title="Read the signals before you ship."
            description="Pair StatCards with testimonials to prove impact."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard label="Active members" value="12,480" delta="+18%" tone="olive" />
            <StatCard label="Projects shipped" value="342" delta="+24" tone="sage" />
            <StatCard label="Avg. session" value="9m 14s" delta="+1.8m" tone="indigo" />
          </div>
          <Testimonial
            quote={testimonials[0].quote}
            name={testimonials[0].name}
            className="bg-gradient-to-br from-cream to-white"
          />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-nude/40 pt-6 text-sm text-[color:var(--fg)]/70">
          <span>© {new Date().getFullYear()} Eirén Studio</span>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-olive transition">Packages</Link>
            <Link to="/components#features" className="hover:text-olive transition">Features</Link>
            <Link to="/components#library" className="hover:text-olive transition">Library</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
