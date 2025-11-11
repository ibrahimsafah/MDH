import React from 'react'

export const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
  }[align] ?? 'text-left'

  return (
    <div className={`space-y-3 ${alignment}`}>
      {eyebrow && <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--fg)]/60">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && <p className="text-[color:var(--fg)]/80 max-w-2xl mx-auto">{description}</p>}
    </div>
  )
}
