import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'

const navItems = [
  { label: 'Services', key: 'services', path: '/components#features' },
  { label: 'Inspiration', key: 'design', path: '/components#library' },
  { label: 'Project Estimator', key: 'estimator', path: '/estimator' },
  { label: 'Our process', key: 'process', path: '/components#insights' },
  { label: 'Testimonials', key: 'testimonials', path: '/testimonials', noFlyout: true },
  { label: 'Request a quote', key: 'quote', anchor: '#quote', noFlyout: true },
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

export default function Home() {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(null)

  const activeFlyout = openMenu && !navItems.find(item => item.key === openMenu)?.noFlyout ? flyoutMenus[openMenu] : null

  return (
    <div>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-6xl px-6 py-10 space-y-20">
          <header
            className="relative flex flex-wrap items-center gap-6 rounded-2xl border border-nude/40 bg-transparent p-6"
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="flex flex-1 items-center">
              <img
                src="/maison-du-hardscape-logo.svg"
                alt="Maison Du Hardscape — Where technology meets tradition"
                className="h-32 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <nav className="relative flex flex-wrap items-center gap-4 text-sm font-medium text-olive">
              {navItems.map(item => (
                <button
                  key={item.key}
                  type="button"
                  className={`rounded-xl px-3 py-2 transition ${openMenu === item.key ? 'bg-olive/10 text-olive' : 'hover:text-olive'}`}
                  onMouseEnter={() => !item.noFlyout && setOpenMenu(item.key)}
                  onFocus={() => !item.noFlyout && setOpenMenu(item.key)}
                  onClick={() => {
                    setOpenMenu(prev => (prev === item.key ? null : item.key))
                    if (item.path) {
                      setOpenMenu(null)
                      navigate(item.path)
                      return
                    }
                    if (item.anchor) {
                      setOpenMenu(null)
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

          <section
            id="quote"
            className="space-y-8 rounded-3xl border border-nude/50 bg-white/80 p-8 shadow-mild"
          >
            <SectionHeading
              eyebrow="Request a quote"
              title="Tell us about your space."
              description="Share how you plan to use your patio and the Techo-Bloc finishes you love. We’ll follow up with a tailored scope and schedule a site measure."
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
                  className="min-h-[140px] w-full rounded-2xl border border-nude/50 bg-white/90 p-4 text-sm text-[color:var(--fg)] outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
                  placeholder="Describe how you’ll use the space, preferred Techo-Bloc products, and any must-have features."
                  required
                />
              </div>
              <div className="text-right">
                <Button size="lg" type="submit">
                  Submit request
                </Button>
              </div>
            </form>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-nude/40 pt-6 text-sm text-[color:var(--fg)]/70">
            <span>© {new Date().getFullYear()} Eirén Studio</span>
            <div className="flex flex-wrap gap-4">
              <Link to="/components" className="hover:text-olive transition">Components</Link>
              <Link to="/components#features" className="hover:text-olive transition">Features</Link>
              <Link to="/components#library" className="hover:text-olive transition">Library</Link>
              <Link to="/components#insights" className="hover:text-olive transition">Insights</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
