import React from 'react'
export const Badge = ({ children, tone='olive' }) => {
  const tones = {
    olive: 'bg-olive/10 text-olive border-olive/20',
    sage: 'bg-sage/10 text-[#54624D] border-sage/30',
    nude: 'bg-nude/20 text-[#734e3a] border-nude/40',
    indigo: 'bg-indigo/10 text-indigo border-indigo/25',
  }
  return <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>
}
