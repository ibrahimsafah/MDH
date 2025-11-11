import React from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Button } from '../components/Button.jsx'

const timeline = [
  {
    year: 1995,
    title: 'Maison Du Hardscape is founded',
    detail:
      'Two siblings, both second-generation masons, formalize the studio to bring European courtyard craft to North American homes.',
  },
  {
    year: 2005,
    title: 'Design-build expansion',
    detail:
      'We add in-house designers and estimators so every pattern, drainage line, and lighting cue is coordinated under one roof.',
  },
  {
    year: 2015,
    title: 'Sustainability studio',
    detail:
      'Permeable bases, low-carbon concrete mixes, and reclaimed stone sourcing become standard in our specs.',
  },
  {
    year: 2024,
    title: 'Personalized estate program',
    detail:
      'Concierge teams pair clients with artisans to co-create one-of-a-kind lounges, kitchens, and destination-grade retreats.',
  },
]

const pillars = [
  {
    title: 'Craft rooted in stone',
    description:
      'Every detail—from the herringbone starter course to the jointing sand—is obsessively tuned. We sketch by hand before we ever model in 3D.',
  },
  {
    title: 'Designing for real lives',
    description:
      'We listen for rituals: sunrise espresso, barefoot pool decks, grandkid campfires. Those stories drive every material choice.',
  },
  {
    title: 'Stewardship mindset',
    description:
      'We balance indulgence with responsibility, favoring long-life surfaces, smart water systems, and sourcing partners who share our ethics.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-5xl px-6 py-12 space-y-16">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="About Maison Du Hardscape"
            title="Crafting timeless hardscapes since 1995."
            description="We started as a family workshop obsessed with stone and still treat every commission like a signature piece—tailored, personal, and built to weather decades."
          />
          <div className="flex flex-wrap items-center gap-4 text-sm text-[color:var(--fg)]/70">
            <span>Located in Montréal · Serving North America</span>
            <span className="h-1 w-12 rounded-full bg-olive/30" />
            <span>Licensed, bonded, & woman-owned</span>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-[color:var(--fg)]/60">
            Our arc
          </h2>
          <div className="space-y-4">
            {timeline.map(event => (
              <article
                key={event.year}
                className="rounded-3xl border border-nude/50 bg-white/85 p-6 shadow-mild"
              >
                <div className="text-xs uppercase tracking-[0.4em] text-olive">{event.year}</div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--fg)]">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--fg)]/80">{event.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Why we build"
            title="Passion, personalization, and legacy."
            description="Hardscape is more than paving—it's choreography for how people gather. We stay close to every client so the final space feels unmistakably theirs."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(pillar => (
              <div key={pillar.title} className="rounded-3xl border border-nude/50 bg-white/80 p-5 shadow-mild">
                <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-3 text-sm text-[color:var(--fg)]/80">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-nude/50 bg-white/85 p-8 shadow-mild">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--fg)]/50">Next step</div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                Ready for a personal build?
              </h3>
              <p className="mt-2 text-sm text-[color:var(--fg)]/80">
                Share your rituals and preferred materials, and we’ll map a path from sketch to installation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/estimator">
                <Button variant="outline">Explore estimator</Button>
              </Link>
              <a href="#quote">
                <Button>Request a consult</Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
