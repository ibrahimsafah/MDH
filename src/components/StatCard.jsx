import React from 'react'

export const StatCard = ({ label, value, delta, tone = 'olive', className = '' }) => {
  const toneStyles = {
    olive: 'text-olive bg-olive/10',
    sage: 'text-sage bg-sage/10',
    nude: 'text-nude bg-nude/10',
    indigo: 'text-indigo bg-indigo/10',
  }

  return (
    <div className={`rounded-2xl border border-nude/50 bg-white/80 p-6 shadow-mild ${className}`}>
      <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--fg)]/60">{label}</p>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-4xl font-semibold text-[color:var(--fg)]">{value}</span>
        {delta && (
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${toneStyles[tone] ?? toneStyles.olive}`}>
            {delta}
          </span>
        )}
      </div>
    </div>
  )
}
