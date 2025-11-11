import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'

import { fetchEstimatorConfig } from '../lib/api.js'

const currency = value =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 })

const clampNumber = (value, min, max) => {
  if (!Number.isFinite(value)) return min ?? 0
  let next = value
  if (typeof min === 'number') next = Math.max(min, next)
  if (typeof max === 'number') next = Math.min(max, next)
  return next
}

const formatRange = (low, high) => {
  if (!Number.isFinite(low) || !Number.isFinite(high)) return '—'
  return low === high ? currency(low) : `${currency(low)} – ${currency(high)}`
}

const createInitialSelections = services =>
  services.reduce((acc, service) => {
    const min = service.minQty ?? 0
    const defaultQty = service.defaultQty ?? min
    acc[service.id] = {
      active: service.required ? true : service.defaultActive ?? false,
      qty: service.unit ? defaultQty : 1,
    }
    return acc
  }, {})

export default function EstimatorPage() {
  const [services, setServices] = useState([])
  const [experiences, setExperiences] = useState([])
  const [selections, setSelections] = useState({})
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    fetchEstimatorConfig()
      .then(config => {
        if (ignore) return
        setServices(config.services ?? [])
        setExperiences(config.experiences ?? [])
        setSelections(createInitialSelections(config.services ?? []))
        setStatus('ready')
      })
      .catch(err => {
        if (ignore) return
        setError(err.message || 'Unable to load estimator configuration.')
        setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [])

  const toggleService = serviceId => {
    const service = services.find(item => item.id === serviceId)
    if (service?.required) return
    setSelections(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        active: !prev[serviceId].active,
      },
    }))
  }

  const handleQtyChange = (serviceId, value) => {
    const service = services.find(item => item.id === serviceId)
    if (!service) return
    const numeric = clampNumber(Number(value), service.minQty, service.maxQty)
    setSelections(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        qty: numeric,
      },
    }))
  }

  const breakdown = useMemo(() => {
    return services
      .map(service => {
        const selection = selections[service.id]
        if (!selection?.active) return null
        const quantity = service.unit ? selection.qty : 1
        return {
          service,
          quantity,
          totals: Object.entries(service.rates).reduce((map, [experience, range]) => {
            map[experience] = {
              low: service.unit ? quantity * range.low : range.low,
              high: service.unit ? quantity * range.high : range.high,
            }
            return map
          }, {}),
        }
      })
      .filter(Boolean)
  }, [selections])

  const rollupTotals = experiences.reduce((acc, band) => {
    const totals = breakdown.reduce(
      (sum, item) => {
        const bandTotals = item.totals[band.id]
        return {
          low: sum.low + (bandTotals?.low ?? 0),
          high: sum.high + (bandTotals?.high ?? 0),
        }
      },
      { low: 0, high: 0 }
    )
    acc[band.id] = totals
    return acc
  }, {})

  const renderStatusPanel = () => {
    if (status === 'ready') return null
    const message =
      status === 'loading'
        ? 'Loading estimator benchmarks…'
        : error || 'Something went wrong while loading the estimator.'
    return (
      <div className="rounded-3xl border border-nude/40 bg-white/80 p-10 text-center text-[color:var(--fg)]">
        <p className="text-lg font-semibold">{message}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading
            eyebrow="Project estimator"
            title="Quote smarter with Triangle benchmarks."
            description="Every Maison du Hardscape engagement starts with discovery, Techo-Bloc material selection, and an on-site measure. Use the toggles below to model scope and align with local pricing."
          />
          <Link to="/" className="shrink-0">
            <Button variant="outline">Back to studio</Button>
          </Link>
        </div>

        <div className="grid gap-6 rounded-3xl border border-nude/40 bg-white/70 p-6 text-sm text-[color:var(--fg)]/80 md:grid-cols-3">
          <div>
            <p className="font-semibold text-[color:var(--fg)]">Discovery</p>
            <p>Define how the patio will be used: daily rituals, hosting cadence, desired Techo-Bloc textures.</p>
          </div>
          <div>
            <p className="font-semibold text-[color:var(--fg)]">Material walkthrough</p>
            <p>Review Techo-Bloc collections, retaining systems, lighting, and fire features that match the brief.</p>
          </div>
          <div>
            <p className="font-semibold text-[color:var(--fg)]">Site measure</p>
            <p>We document grades, drainage, and utilities to translate this budget into a formal proposal.</p>
          </div>
        </div>

        {status !== 'ready' ? (
          renderStatusPanel()
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
              {services.map(service => {
              const selection = selections[service.id]
              const isActive = selection?.active
              const quantity = service.unit ? selection?.qty ?? service.defaultQty ?? service.minQty ?? 0 : 1
              return (
                <div
                  key={service.id}
                  className={`rounded-3xl border border-nude/50 bg-white/85 p-6 shadow-mild transition ${
                    isActive ? '' : 'opacity-60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{service.name}</h3>
                      <p className="text-sm text-[color:var(--fg)]/70">{service.description}</p>
                    </div>
                    {service.required ? (
                      <span className="rounded-full border border-olive/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-olive/80">
                        Core scope
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                          isActive ? 'border-olive bg-olive/10 text-olive' : 'border-nude/60 text-[color:var(--fg)]/70 hover:border-olive/40'
                        }`}
                      >
                        {isActive ? 'Included' : 'Add scope'}
                      </button>
                    )}
                  </div>

                  {service.unit && (
                    <div className="mt-4 grid gap-4 md:grid-cols-[220px_1fr]">
                      <Input
                        type="number"
                        min={service.minQty}
                        max={service.maxQty}
                        value={quantity}
                        onChange={event => handleQtyChange(service.id, event.target.value)}
                        disabled={!isActive}
                        label={service.quantityLabel}
                        hint={
                          service.minQty && service.maxQty
                            ? `Range ${service.minQty}-${service.maxQty} ${service.unit}`
                            : undefined
                        }
                      />
                      <div className="rounded-2xl border border-nude/40 bg-white/80 p-4 text-xs text-[color:var(--fg)]/70">
                        <p>Benchmark rates shown per {service.unit}. Adjust quantity for the portion you plan to build now.</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 rounded-2xl border border-dashed border-nude/40 bg-white/60 px-4 py-3 text-sm text-[color:var(--fg)]/70">
                    <p>Rates vary by finish level. Review the summary to compare Essential, Refined, and Bespoke investment windows.</p>
                  </div>
                </div>
              )
            })}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-nude/60 bg-white p-6 shadow-mild">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/60">Current model</p>
              <div className="mt-4 space-y-3">
                {breakdown.length === 0 ? (
                  <p className="text-sm text-[color:var(--fg)]/70">Add scope on the left to see a budget window.</p>
                ) : (
                  breakdown.map(item => (
                    <div key={item.service.id} className="rounded-2xl border border-nude/40 bg-white/70 p-3 text-sm">
                      <p className="font-semibold text-[color:var(--fg)]">{item.service.name}</p>
                      <div className="mt-2 grid gap-2 text-xs text-[color:var(--fg)]/70">
                        {experiences.map(band => {
                          const totals = item.totals[band.id]
                          return (
                            <div key={`${item.service.id}-${band.id}`} className="flex items-center justify-between">
                              <span>{band.name}</span>
                              <span className="font-semibold text-[color:var(--fg)]">
                                {totals ? formatRange(totals.low, totals.high) : '—'}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <hr className="my-4 border-nude/30" />
              <div className="space-y-3">
                {experiences.length === 0 ? (
                  <p className="text-sm text-[color:var(--fg)]/70">Experience lanes will populate once configuration loads.</p>
                ) : (
                  experiences.map(band => (
                    <div key={`summary-${band.id}`} className="rounded-2xl border border-nude/30 bg-white/80 p-3 text-sm">
                      <div className="flex items-center justify-between text-[color:var(--fg)]/70">
                        <span>{band.name} window</span>
                        <span className="font-semibold text-[color:var(--fg)]">
                          {formatRange(rollupTotals[band.id].low, rollupTotals[band.id].high)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Button className="mt-6 w-full">Share this configuration</Button>
            </div>

            <div className="rounded-3xl border border-nude/60 bg-white/80 p-6 shadow-mild">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--fg)]/60">Experience lanes</p>
              <div className="mt-4 space-y-4">
                {experiences.map(band => (
                  <div key={`band-${band.id}`} className="rounded-2xl border border-nude/40 bg-white/70 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold tracking-tight text-[color:var(--fg)]">{band.name}</h4>
                        <p className="text-sm text-[color:var(--fg)]/70">{band.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-[color:var(--fg)]">
                        {formatRange(rollupTotals[band.id].low, rollupTotals[band.id].high)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[color:var(--fg)]/60">
                Benchmarks reference Jernigan Landscaping, RK Preferred Landscaping, Westwall Hardscapes, and national 2024 guides. Adjust for
                permits, utilities, and complexity.
              </p>
            </div>

            <div className="rounded-3xl border border-nude/50 bg-white/70 p-5 shadow-mild text-sm text-[color:var(--fg)]/80">
              <p className="font-semibold text-[color:var(--fg)]">What happens after this?</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>We review your selections during a discovery call.</li>
                <li>Share Techo-Bloc inspiration boards and confirm service tiers.</li>
                <li>Schedule the on-site measure to finalize drainage, access, and phasing.</li>
              </ul>
            </div>
          </aside>
          </div>
        )}
      </div>
    </div>
  )
}
