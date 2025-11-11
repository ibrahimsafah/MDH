import React from 'react'
function cx(...c){return c.filter(Boolean).join(' ')}
export const Input = ({ label, hint, className='', ...props }) => (
  <label className="flex flex-col gap-2">
    {label && <span className="text-sm text-indigo font-medium">{label}</span>}
    <input
      className={cx('h-11 rounded-xl border bg-white/70 backdrop-blur-sm px-4 text-charcoal placeholder-sage',
        'border-sage/50 focus:border-olive focus:ring-2 focus:ring-nude outline-none', className)}
      {...props}
    />
    {hint && <span className="text-xs text-olive/80">{hint}</span>}
  </label>
)
