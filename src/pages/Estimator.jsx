import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Button } from '../components/Button.jsx'

const estimatorCategories = [
  {
    id: 'surfaces',
    title: 'Foundation surfaces',
    description: 'Choose the base for patios, pathways, or courtyards.',
    options: [
      { id: 'paver-patio', label: 'Custom paver patio (400–600 sq ft)', cost: 18500 },
      { id: 'natural-terrace', label: 'Natural stone terrace', cost: 24500 },
      { id: 'walkway', label: 'Paver walkway network', cost: 9500 },
    ],
  },
  {
    id: 'structures',
    title: 'Walls & structures',
    description: 'Add retaining elements or built seating.',
    options: [
      { id: 'seat-wall', label: 'Seat wall (linear 20 ft)', cost: 7200 },
      { id: 'retaining-wall', label: 'Retaining wall with drainage', cost: 12800 },
      { id: 'pergola', label: 'Timber pergola or shade arbor', cost: 16400 },
    ],
  },
  {
    id: 'kitchen',
    title: 'Outdoor kitchens & fire',
    description: 'Anchor the space with cooking or gathering features.',
    options: [
      { id: 'grill-island', label: 'Grill island w/ counter + storage', cost: 15500 },
      { id: 'full-kitchen', label: 'Full kitchen + bar (premium finishes)', cost: 32000 },
      { id: 'fire-feature', label: 'Custom fire feature (gas or wood)', cost: 9800 },
      { id: 'fireplace', label: 'Masonry fireplace', cost: 18200 },
    ],
  },
  {
    id: 'water-light',
    title: 'Water, lighting & tech',
    description: 'Accents that extend usability deep into the evening.',
    options: [
      { id: 'water-feature', label: 'Water feature (rill, basin, or wall)', cost: 13800 },
      { id: 'accent-lighting', label: 'Accent lighting package', cost: 5200 },
      { id: 'smart-lighting', label: 'Smart lighting & control system', cost: 6400 },
    ],
  },
  {
    id: 'services',
    title: 'Services & management',
    description: 'Professional support to keep the build on schedule.',
    options: [
      { id: 'design-consult', label: '3D design consultation', cost: 2800 },
      { id: 'project-management', label: 'On-site project management', cost: 4500 },
      { id: 'maintenance-plan', label: 'First-year maintenance plan', cost: 1800 },
    ],
  },
]

const tierRecommendations = [
  { name: 'Foundation Package', min: 0, max: 30000, description: 'Ideal for patios, walkways, and essential gathering space.' },
  { name: 'Signature Package', min: 30000, max: 70000, description: 'Adds kitchens, fire features, and layered lighting.' },
  { name: 'Estate Package', min: 70000, max: Infinity, description: 'Full outdoor rooms, structures, and concierge management.' },
]

const currency = value => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function EstimatorPage() {
  const [selected, setSelected] = useState({})

  const toggleOption = optionId => {
    setSelected(prev => ({
      ...prev,
      [optionId]: !prev[optionId],
    }))
  }

  const flattenOptions = useMemo(
    () => estimatorCategories.flatMap(category => category.options.map(option => ({ ...option, category: category.title }))),
    []
  )

  const selectedOptions = flattenOptions.filter(option => selected[option.id])
  const subtotal = selectedOptions.reduce((sum, option) => sum + option.cost, 0)
  const contingency = subtotal * 0.1
  const total = subtotal + contingency

  const recommendedTier =
    tierRecommendations.find(tier => subtotal >= tier.min && subtotal < tier.max) ?? tierRecommendations[tierRecommendations.length - 1]

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading
            eyebrow="Project estimator"
            title="Build your hardscape vision."
            description="Select the elements you’re considering to see a working budget range. We’ll refine it with site conditions and material selections."
          />
          <Link to="/" className="shrink-0">
            <Button variant="outline">Back to studio</Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            {estimatorCategories.map(category => (
              <div key={category.id} className="rounded-3xl border border-nude/50 bg-white/80 p-6 shadow-mild">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{category.title}</h3>
                    <p className="text-sm text-[color:var(--fg)]/70">{category.description}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/60">Select</span>
                </div>
                <div className="mt-5 space-y-3">
                  {category.options.map(option => {
                    const isActive = !!selected[option.id]
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleOption(option.id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                          isActive
                            ? 'border-olive bg-olive/10 text-olive'
                            : 'border-nude/60 bg-white/70 text-[color:var(--fg)] hover:border-olive/60'
                        }`}
                        aria-pressed={isActive}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{option.label}</p>
                          </div>
                          <span className="text-sm font-semibold">{currency(option.cost)}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-nude/60 bg-white p-6 shadow-mild">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/60">Selected scope</p>
              <div className="mt-4 space-y-3">
                {selectedOptions.length === 0 ? (
                  <p className="text-sm text-[color:var(--fg)]/70">Add items from the left to start building your estimate.</p>
                ) : (
                  selectedOptions.map(option => (
                    <div key={option.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-[color:var(--fg)]">{option.label}</p>
                        <p className="text-[color:var(--fg)]/60">{option.category}</p>
                      </div>
                      <span className="font-semibold text-[color:var(--fg)]">{currency(option.cost)}</span>
                    </div>
                  ))
                )}
              </div>
              <hr className="my-4 border-nude/40" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-[color:var(--fg)]/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[color:var(--fg)]">{currency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[color:var(--fg)]/70">
                  <span>10% contingency</span>
                  <span className="font-semibold text-[color:var(--fg)]">{currency(contingency)}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Estimated total</span>
                  <span>{currency(total)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-nude/60 bg-white/80 p-6 shadow-mild">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/60">Recommended tier</p>
              <h4 className="mt-3 text-2xl font-semibold tracking-tight">{recommendedTier.name}</h4>
              <p className="text-sm text-[color:var(--fg)]/70">{recommendedTier.description}</p>
              <div className="mt-5 space-y-3 text-sm text-[color:var(--fg)]/70">
                <div className="flex items-center justify-between">
                  <span>Range</span>
                  <span>
                    {currency(recommendedTier.min)} –{' '}
                    {Number.isFinite(recommendedTier.max) ? currency(recommendedTier.max) : currency(recommendedTier.min * 1.5) + '+'}
                  </span>
                </div>
              </div>
              <Button className="mt-6 w-full">Share project brief</Button>
            </div>

            <p className="text-xs text-[color:var(--fg)]/60">
              Estimates shown are conceptual and exclude permits, utilities, and site-specific engineering. A site visit and detailed design
              session will produce a formal proposal.
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
