import React from 'react'

export const Testimonial = ({ quote, name, title, avatar, className = '' }) => {
  return (
    <div className={`rounded-3xl border border-nude/60 bg-white p-8 shadow-mild ${className}`}>
      <p className="text-lg italic leading-relaxed text-[color:var(--fg)]/90">“{quote}”</p>
      <div className="mt-6 flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-2xl bg-cream">
          {avatar ? <img src={avatar} alt={name} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-olive/30" />}
        </div>
        <div>
          <p className="font-semibold text-[color:var(--fg)]">{name}</p>
          <p className="text-sm text-[color:var(--fg)]/70">{title}</p>
        </div>
      </div>
    </div>
  )
}
