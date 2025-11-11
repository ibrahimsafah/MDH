import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { RequestQuote } from '../components/RequestQuote.jsx'
import { Step } from '../components/Step.jsx'

const InspireIcon = props => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="M4.93 6.93l2.83 2.83" />
    <path d="M16.24 18.24l2.83 2.83" />
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <path d="M6.93 17.07l2.83-2.83" />
    <path d="M18.24 5.76l-2.83 2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const DesignIcon = props => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <path d="M13.5 13.5h7v7h-7z" />
  </svg>
)

const BuildIcon = props => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M7 7h10v6H7z" />
    <path d="M5 19v-5h14v5" />
    <path d="M3 19h18" />
  </svg>
)

const AboutIcon = props => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.5-3 4.5-5 7-5s5.5 2 7 5" />
  </svg>
)

const navItems = [
  { label: 'Inspire', key: 'inspire', icon: InspireIcon },
  { label: 'Design', key: 'design', icon: DesignIcon },
  { label: 'Build', key: 'build', path: '/estimator', noFlyout: true, icon: BuildIcon },
  { label: 'About us', key: 'about', path: '/about', noFlyout: true, icon: AboutIcon },
]

const flyoutMenus = {
  inspire: {
    type: 'stacked',
    heading: 'Inspiration studio',
    description: 'Seasonal palettes, layout studies, and tactile libraries to inform every outdoor build.',
    items: [
      {
        title: 'Gallery',
        description: 'Dive into built work, mood films, and layout studies to spark the next idea.',
        meta: 'Showcase',
        to: '/components#library',
      },
      {
        title: 'Colors',
        description: 'Tone pairings, seasonal palettes, and finish combinations curated for outdoor rooms.',
        meta: 'Palette',
        to: '/components#library',
      },
      {
        title: 'Patterns & Mosaics',
        description: 'Grid systems, inlays, and stone mosaics that balance rhythm with tactile detail.',
        meta: 'Details',
        to: '/components#library',
      },
    ],
    footerActions: [
      {
        label: 'Browse the full library',
        description: 'See every palette, board, and vignette we publish.',
        to: '/components#library',
      },
      {
        label: 'Book a design consult',
        description: 'Share your mood board and we’ll refine it live.',
        to: '#quote',
      }
    ]
  },
  design: {
    type: 'grid',
    cards: [
      {
        title: 'Discovery atelier',
        description: 'In-depth workshops covering audience, brand rituals, and desired atmospheres.',
        meta: 'Phase 01'
      },
      {
        title: 'Design studies',
        description: 'Three narrative directions with mood films, palette pairings, and micro-interactions.',
        meta: 'Phase 02'
      },
      {
        title: 'Construction docs',
        description: 'Component documentation, CMS setup, and concierge launch support.',
        meta: 'Phase 03'
      },
      {
        title: 'Build & handoff',
        description: 'Component documentation, CMS setup, and concierge launch support.',
        meta: 'Phase 04'
      }
    ]
  }
}

const processSteps = [
  {
    title: 'Inspire',
    subtitle: 'Consultation',
    bullets: [
      'We start with a personal design consultation to uncover your vision and lifestyle.',
      'Together we explore layout ideas, key features, and your preferred style.',
      'Then we refine materials, colors, and patterns to create harmony and inspiration.',
      'We document site conditions with the latest surveying tech to steer each decision.',
    ],
  },
  {
    title: 'Design',
    subtitle: 'Concept Studio',
    description:
      'Our studio turns the brief into layered drawings, renders, and build notes everyone can follow.',
    bullets: [
      'Masterplan covering grading, lighting, and planting arcs',
      'Render set showing dawn brunch through midnight swim',
      'Material + partner dossier with planting palettes and budgets',
    ],
  },
  {
    title: 'Build',
    subtitle: 'Field Delivery',
    description:
      'We stay close through procurement and install, syncing trades and refining every detail.',
    bullets: [
      'Curated team selection with aligned bids',
      'On-site direction from excavation to final styling',
      'Care dossier outlining seasonal upkeep and hosting cues',
    ],
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(null)

  const handleRoute = target => {
    if (!target) return
    if (target.startsWith('#')) {
      const el = document.querySelector(target)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    navigate(target)
  }

  const handleFlyoutNavigation = target => {
    if (!target) return
    setOpenMenu(null)
    handleRoute(target)
  }

  const currentNavItem = navItems.find(item => item.key === openMenu)
  const activeFlyout = currentNavItem && !currentNavItem.noFlyout ? flyoutMenus[openMenu] : null

  return (
    <div>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-6xl px-6 py-10 space-y-20">
          <header
            className="relative flex flex-wrap items-center gap-6 bg-transparent py-4"
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div>
              <Link
                to="/"
                className="text-sm font-semibold uppercase tracking-[0.6em] text-[color:var(--fg)] hover:text-olive transition"
              >
                Maison Du Hardscape
              </Link>
              <div className="text-[0.75rem] font-medium uppercase tracking-[0.5em] text-olive">
                Luxury Outdoor Living
              </div>
            </div>
            <nav className="relative ml-auto flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-olive">
              {navItems.map(item => (
                <button
                  key={item.key}
                  type="button"
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 transition ${openMenu === item.key ? 'bg-olive/10 text-olive' : 'hover:text-olive'}`}
                  onMouseEnter={() => !item.noFlyout && setOpenMenu(item.key)}
                  onFocus={() => !item.noFlyout && setOpenMenu(item.key)}
                  onClick={() => {
                    setOpenMenu(prev => (prev === item.key ? null : item.key))
                    const target = item.path ?? item.anchor
                    if (target) {
                      setOpenMenu(null)
                      handleRoute(target)
                    }
                  }}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </button>
              ))}
            </nav>
            {activeFlyout && (
              <div className="absolute left-0 top-full mt-4 w-full rounded-3xl border border-nude/50 bg-white/95 p-6 shadow-deep">
                {activeFlyout.type === 'stacked' ? (
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--fg)]/50">Inspiration</div>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight">{activeFlyout.heading}</h3>
                      <p className="mt-2 text-sm text-[color:var(--fg)]/80">{activeFlyout.description}</p>
                    </div>
                    <div className="space-y-3">
                      {activeFlyout.items.map(item => (
                        <button
                          key={item.title}
                          type="button"
                          className="flex w-full items-start justify-between rounded-2xl border border-nude/40 bg-cream/50 p-4 text-left transition hover:-translate-y-0.5 hover:bg-cream"
                          onClick={() => handleFlyoutNavigation(item.to)}
                        >
                          <div>
                            <div className="text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/50">{item.meta}</div>
                            <h4 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h4>
                            <p className="mt-1 text-sm text-[color:var(--fg)]/80">{item.description}</p>
                          </div>
                          <span className="text-lg text-olive">→</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 border-t border-nude/40 pt-4 text-left">
                      {activeFlyout.footerActions.map(action => (
                        <button
                          key={action.label}
                          type="button"
                          className="flex flex-1 min-w-[220px] flex-col rounded-2xl bg-olive/5 p-4 text-left transition hover:bg-olive/10"
                          onClick={() => handleFlyoutNavigation(action.to)}
                        >
                          <span className="text-sm font-semibold text-olive">{action.label}</span>
                          <span className="text-xs text-[color:var(--fg)]/70">{action.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-3">
                    {activeFlyout.cards.map(card => (
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
                )}
              </div>
            )}
          </header>

          <section className="space-y-10">
            <SectionHeading
              eyebrow="Our three step process"
              title="From first spark to finished terrace."
              description="Inspire, Design, Build—every phase hands off cleanly so the next move stays clear."
            />
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
              {processSteps.map((step, index) => (
                <React.Fragment key={step.title}>
                  <Step
                    title={step.title}
                    subtitle={step.subtitle}
                    description={step.description}
                    bullets={step.bullets}
                  />
                  {index < processSteps.length - 1 && (
                    <div className="flex items-center justify-center lg:h-full lg:flex-col lg:gap-6 lg:justify-center">
                      <div className="hidden lg:block h-16 w-px bg-olive/30" />
                      <svg
                        className="h-8 w-8 text-olive"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                      <div className="hidden lg:block h-16 w-px bg-olive/30" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          <RequestQuote />

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-nude/40 pt-6 text-sm text-[color:var(--fg)]/70">
            <span>© {new Date().getFullYear()} Maison Du Hardscape</span>
            <span className="tracking-[0.35em] uppercase text-xs text-olive">Luxury Outdoor Living</span>
          </footer>
        </div>
      </div>
    </div>
  )
}
