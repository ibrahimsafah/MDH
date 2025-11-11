import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const navItems = [
  { label: 'Services', key: 'services', anchor: '#features' },
  { label: 'Testimonials', key: 'testimonials', path: '/testimonials' },
  { label: 'Design', key: 'design', anchor: '#library' },
  { label: 'Documents', key: 'documents', anchor: '#documents' },
  { label: 'Project Estimator', key: 'estimator', path: '/estimator' },
  { label: 'Our process', key: 'process', anchor: '#insights' },
]

const flyoutMenus = {
  services: [
    {
      title: 'Bespoke estate sites',
      description: 'Custom builds for hospitality, interiors, and residential launches with high-touch detail.',
      meta: 'Flagship'
    },
    {
      title: 'Brand systems',
      description: 'Visual identities, typography scales, and palette curation embedded into your CMS.',
      meta: 'New'
    },
    {
      title: 'VIP retainers',
      description: 'Ongoing design direction, CRO experiments, and seasonal refreshes.',
      meta: 'Limited'
    }
  ],
  documents: [
    {
      title: 'Covenants',
      description: 'Protective covenants, conditions, and restrictions summary for The Forest HOA.',
      meta: 'Download'
    },
    {
      title: 'Meeting Minutes',
      description: 'Archived board meeting notes for transparency and compliance.',
      meta: 'Archive'
    },
    {
      title: 'Architectural guidelines',
      description: 'Submission requirements, review timelines, and approved materials list.',
      meta: 'Guides'
    }
  ],
  testimonials: [
    {
      title: 'Estate developers',
      description: '“Eirén captured the warmth we needed for our luxury rentals.”',
      meta: 'Read case'
    },
    {
      title: 'Interior studios',
      description: '“The kit let us ship a lookbook in days, not weeks.”',
      meta: '3 stories'
    },
    {
      title: 'Boutique hotels',
      description: '“Guests browse suites like an art book—exactly what we wanted.”',
      meta: 'Watch film'
    }
  ],
  design: [
    {
      title: 'Mosaics',
      description: 'Responsive grid layouts inspired by tilework and botanical motifs.',
      meta: 'Gallery'
    },
    {
      title: 'Inspiration',
      description: 'Mood boards and seasonal direction to align interiors with exterior experiences.',
      meta: 'Inspiration'
    },
    {
      title: 'Color guide',
      description: 'Tone pairings and palette guidance to keep every page cohesive.',
      meta: 'Palette'
    }
  ],
  process: [
    {
      title: 'Discovery atelier',
      description: 'In-depth workshops covering audience, brand rituals, and desired atmospheres.',
      meta: 'Week 1'
    },
    {
      title: 'Design studies',
      description: 'Three narrative directions with mood films, palette pairings, and micro-interactions.',
      meta: 'Week 2-3'
    },
    {
      title: 'Build & handoff',
      description: 'Component documentation, CMS setup, and concierge launch support.',
      meta: 'Week 4+'
    }
  ]
}

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

const packageTiers = [
  {
    title: 'Foundation Package',
    subtitle: 'Essential Outdoor Upgrade',
    price: 'Starting at $15,000 – $25,000',
    bullets: [
      'Custom paver patio or walkway',
      'Basic retaining or seat wall',
      'Site preparation & base installation',
      'Material consultation',
      'Optional: lighting, planters, sealing',
    ],
  },
  {
    title: 'Signature Package',
    subtitle: 'Entertainer’s Escape',
    price: 'Starting at $35,000 – $60,000',
    bullets: [
      'Integrated patio, walkways & walls',
      'Outdoor kitchen or grill island',
      'Fire feature (gas or wood)',
      'Accent lighting for ambiance & safety',
      '3D design consultation',
    ],
  },
  {
    title: 'Estate Package',
    subtitle: 'Luxury Outdoor Retreat',
    price: 'Starting at $75,000+',
    bullets: [
      'Full hardscape & landscape integration',
      'Custom kitchen & bar with premium materials',
      'Fireplace and/or water feature',
      'Pergolas, shade structures & lounge areas',
      'Smart lighting & project management',
    ],
  },
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

export default function Home() {
  const navigate = useNavigate()
  const [newsletter, setNewsletter] = useState(true)
  const [handoff, setHandoff] = useState(false)
  const [plan, setPlan] = useState('studio')
  const [openMenu, setOpenMenu] = useState(null)

  const activeFlyout = openMenu ? flyoutMenus[openMenu] : null

  return (
    <div>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-6xl px-6 py-10 space-y-20">
          <header
            className="relative flex flex-wrap items-center gap-6 rounded-2xl border border-nude/40 bg-white/70 p-6 shadow-mild"
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="flex flex-1 items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-olive text-white flex items-center justify-center font-semibold">É</div>
              <div>
                <p className="text-lg font-semibold tracking-tight">Eirén Studio</p>
                <p className="text-sm text-[color:var(--fg)]/70">Modern Natural Luxury UI</p>
              </div>
            </div>
            <nav className="relative flex flex-wrap items-center gap-4 text-sm font-medium text-[color:var(--fg)]/80">
              {navItems.map(item => (
                <button
                  key={item.key}
                  type="button"
                  className={`rounded-xl px-3 py-2 transition ${openMenu === item.key ? 'bg-olive/10 text-olive' : 'hover:text-olive'}`}
                  onMouseEnter={() => setOpenMenu(item.key)}
                  onFocus={() => setOpenMenu(item.key)}
                  onClick={() => {
                    setOpenMenu(prev => (prev === item.key ? null : item.key))
                    if (item.path) {
                      navigate(item.path)
                      return
                    }
                    if (item.anchor) {
                      const target = document.querySelector(item.anchor)
                      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            {activeFlyout && (
              <div className="absolute left-0 top-full mt-4 w-full rounded-3xl border border-nude/50 bg-white/95 p-6 shadow-deep">
                <div className="grid gap-4 md:grid-cols-3">
                  {activeFlyout.map(card => (
                    <div key={card.title} className="rounded-2xl border border-nude/40 bg-cream/40 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/50">
                        <span>{card.meta}</span>
                        <span className="h-1 w-8 rounded-full bg-olive/50" />
                      </div>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight">{card.title}</h3>
                      <p className="mt-2 text-sm text-[color:var(--fg)]/80">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section id="packages" className="space-y-10">
            <SectionHeading
              eyebrow="Outdoor packages"
              title="Choose the tier that matches your vision."
              description="From simple patios to full estate retreats, each package scales with craftsmanship, materials, and concierge project management."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {packageTiers.map((tier, index) => (
                <div
                  key={tier.title}
                  className="flex h-full flex-col rounded-3xl border border-nude/50 bg-white/80 p-6 shadow-mild"
                >
                  <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--fg)]/60">Tier {index + 1}</div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{tier.title}</h3>
                  <p className="text-sm text-olive">{tier.subtitle}</p>
                  <p className="mt-4 text-sm font-medium text-[color:var(--fg)]/70">{tier.price}</p>
                  <ul className="mt-6 space-y-3 text-sm text-[color:var(--fg)]/80">
                    {tier.bullets.map(bullet => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-olive" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-4">
                    <Button variant="outline" className="w-full">
                      Learn more
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
              name={`${testimonials[0].name} · ${testimonials[0].origin}`}
              title={testimonials[0].title}
              className="bg-gradient-to-br from-cream to-white"
            />
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-nude/40 pt-6 text-sm text-[color:var(--fg)]/70">
            <span>© {new Date().getFullYear()} Eirén Studio</span>
            <div className="flex gap-4">
              <a href="#features" className="hover:text-olive transition">Features</a>
              <a href="#library" className="hover:text-olive transition">Library</a>
              <a href="#contact" className="hover:text-olive transition">Contact</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
