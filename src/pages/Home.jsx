import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { blogPosts } from '../data/blogPosts.js'

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

const blogDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

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

          <section id="journal" className="space-y-10">
            <SectionHeading
              eyebrow="Field notes"
              title="Monthly articles on contractors, pavers, and sustainable builds."
              description="Follow the last 24 months of lessons learned—how we vet partners, specify durable materials, and keep every hardscape resilient."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {blogPosts.map(post => (
                <article
                  key={post.id}
                  className="flex h-full flex-col justify-between rounded-3xl border border-nude/50 bg-white/80 p-6 shadow-mild"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[color:var(--fg)]/60">
                      <span className="rounded-full bg-olive/10 px-3 py-1 text-[0.7rem] tracking-[0.2em] text-olive">
                        {post.category}
                      </span>
                      <time dateTime={post.date} className="tracking-[0.2em]">
                        {blogDateFormatter.format(new Date(post.date))}
                      </time>
                      <span className="h-1 w-1 rounded-full bg-[color:var(--fg)]/40" />
                      <span className="tracking-[0.2em]">{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">{post.title}</h3>
                    <p className="text-sm text-[color:var(--fg)]/80">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-olive">
                    <span className="text-base">Read the article</span>
                    <span aria-hidden="true" className="text-lg">→</span>
                  </div>
                </article>
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
