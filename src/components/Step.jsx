import React from 'react'

const baseClasses = 'flex h-full flex-col rounded-3xl border border-nude/60 bg-cream/70 p-6 shadow-mild'
const eyebrowClasses = 'text-xs uppercase tracking-[0.4em] text-[color:var(--fg)]/50'
const titleClasses = 'text-2xl font-semibold tracking-tight text-[color:var(--fg)]'
const descriptionClasses = 'mt-2 text-sm text-[color:var(--fg)]/80'
const listClasses = 'mt-4 space-y-2 text-sm text-[color:var(--fg)]/85'

export const Step = ({
  title,
  subtitle,
  description,
  bullets = [],
  className = '',
  children,
  icon: Icon,
}) => {
  const combinedClassName = `${baseClasses} ${className}`.trim()
  const hasHeading = Boolean(subtitle || title)
  const hasBodyContent = Boolean(description || bullets.length > 0 || children)

  return (
    <article className={combinedClassName}>
      {hasHeading && (
        <header className="space-y-2">
          {subtitle && <div className={eyebrowClasses}>{subtitle}</div>}
          {title && (
            <h3 className={`${titleClasses} flex items-center gap-3`}>
              {Icon && <Icon className="h-6 w-6 text-olive" aria-hidden="true" />}
              <span>{title}</span>
            </h3>
          )}
        </header>
      )}
      {hasHeading && hasBodyContent && <div className="my-4 h-px w-full bg-nude/50" />}
      {description && <p className={descriptionClasses}>{description}</p>}
      {bullets.length > 0 && (
        <ul className={listClasses}>
          {bullets.map((bullet, idx) => (
            <li key={typeof bullet === 'string' ? bullet : idx} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-olive" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {children}
    </article>
  )
}
