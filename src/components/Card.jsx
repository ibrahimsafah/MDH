import React from 'react'
function cx(...c){return c.filter(Boolean).join(' ')}
export const Card = ({ title, subtitle, children, className='' }) => (
  <div className={cx('rounded-2xl bg-cream shadow-mild border border-nude/40', className)}>
    {(title || subtitle) && (
      <div className="p-6 pb-0">
        {title && <h3 className="text-xl font-semibold tracking-tight">{title}</h3>}
        {subtitle && <p className="text-sm text-olive mt-1">{subtitle}</p>}
      </div>
    )}
    <div className={cx('p-6', !title && !subtitle && 'pt-6')}>{children}</div>
  </div>
)
