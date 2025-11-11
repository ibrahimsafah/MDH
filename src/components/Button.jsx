import React from 'react'

function cx(...c){return c.filter(Boolean).join(' ')}

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center font-medium transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-11 px-4 text-sm', lg: 'h-12 px-6 text-base' }
  const variants = {
    primary: 'bg-olive text-cream hover:bg-[#5F6553] focus:ring-nude',
    secondary: 'bg-sage text-charcoal hover:bg-[#9A9F86] focus:ring-nude',
    accent: 'bg-nude text-charcoal hover:bg-[#cfab93] focus:ring-nude',
    outline: 'border border-olive text-olive hover:bg-olive hover:text-cream focus:ring-nude',
    ghost: 'text-olive hover:bg-cream/60',
    dark: 'bg-indigo text-white hover:bg-[#343850] focus:ring-nude',
  }
  return <button className={cx(base, sizes[size], variants[variant], className)} {...props}>{children}</button>
}
