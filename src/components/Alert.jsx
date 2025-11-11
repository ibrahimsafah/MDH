import React from 'react'
export const Alert = ({ title, description, tone='olive' }) => {
  const tones = {
    olive: 'bg-olive/10 border-olive/25',
    nude: 'bg-nude/20 border-nude/40',
    indigo: 'bg-indigo/10 border-indigo/25',
  }
  return (
    <div className={`rounded-xl p-4 border ${tones[tone]}`}>
      <div className="font-medium">{title}</div>
      <p className="text-sm mt-1 text-[color:var(--fg)]/80">{description}</p>
    </div>
  )
}
