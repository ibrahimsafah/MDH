import React from 'react'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Toggle = ({ label, description, checked, onChange, className = '', ...props }) => {
  const handleToggle = () => {
    onChange?.(!checked)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleToggle}
      className={cx(
        'w-full rounded-2xl border border-nude/60 bg-white/70 px-4 py-3 text-left transition hover:border-olive focus:outline-none focus:ring-2 focus:ring-nude',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="font-medium text-[color:var(--fg)]">{label}</p>
          {description && <p className="text-sm text-[color:var(--fg)]/70">{description}</p>}
        </div>
        <span
          className={cx(
            'inline-flex h-8 w-14 items-center rounded-full border px-1 transition',
            checked ? 'border-olive bg-olive/90' : 'border-nude/60 bg-white'
          )}
        >
          <span
            className={cx(
              'h-6 w-6 rounded-full bg-white shadow transition-transform',
              checked ? 'translate-x-6' : 'translate-x-0'
            )}
          />
        </span>
      </div>
    </button>
  )
}
