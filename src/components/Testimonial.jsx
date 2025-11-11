import React from 'react'

export const Testimonial = ({ quote, name, className = '' }) => {
  return (
    <div className={`rounded-3xl border border-nude/60 bg-white p-8 shadow-mild ${className}`}>
      <p className="text-lg italic leading-relaxed text-[color:var(--fg)]/90">“{quote}”</p>
      <div className="mt-6">
        <p className="font-semibold text-[color:var(--fg)]">{name}</p>
      </div>
    </div>
  )
}
