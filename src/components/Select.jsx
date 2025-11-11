import React from 'react'

export const Select = ({ label, hint, options = [], value, onChange, className = '', ...props }) => {
  return (
    <label className={`block space-y-2 ${className}`}>
      <span className="text-sm font-medium text-[color:var(--fg)]">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-2xl border border-nude/60 bg-white/80 px-4 py-3 text-[color:var(--fg)] shadow-sm focus:border-olive focus:outline-none focus:ring-2 focus:ring-nude"
          {...props}
        >
          {options.map(option => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[color:var(--fg)]/60">
          ▾
        </span>
      </div>
      {hint && <p className="text-sm text-[color:var(--fg)]/70">{hint}</p>}
    </label>
  )
}
