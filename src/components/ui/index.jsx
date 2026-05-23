// src/components/ui/index.jsx
// Barrel of reusable UI primitives

import Icon from '../icon'

// ─── Badge ────────────────────────────────────────────────────
export function Badge({ status }) {
  const cls = {
    paid: 'badge-paid', verified: 'badge-verified', approved: 'badge-approved',
    resolved: 'badge-resolved', unpaid: 'badge-unpaid', rejected: 'badge-rejected',
    high: 'badge-high', pending: 'badge-pending', moderate: 'badge-moderate',
    'in-progress': 'badge-in-progress', low: 'badge-low', info: 'badge-info',
  }[status] || 'badge-pending'
  return <span className={`badge ${cls}`}>{status?.replace('-', ' ')}</span>
}

// ─── StatCard ─────────────────────────────────────────────────
export function StatCard({ icon, label, value, sub, iconClass = 'icon-dark', onClick }) {
  return (
    <div className={`card p-5 ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-body mb-1" style={{ color: 'var(--mocha)' }}>{label}</p>
          <p className="font-display font-bold text-2xl" style={{ color: 'var(--dark)' }}>{value}</p>
          {sub && <p className="text-xs mt-1" style={{ color: 'var(--mocha)' }}>{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}>
          <Icon name={icon} size={19} />
        </div>
      </div>
    </div>
  )
}

// ─── PageHeader ───────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="font-display font-bold text-2xl" style={{ color: 'var(--dark)' }}>{title}</h1>
        {subtitle && <p className="text-base mt-0.5" style={{ color: 'var(--mocha)' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg" style={{ color: 'var(--dark)' }}>{title}</h3>
          <button onClick={onClose} style={{ color: 'var(--mocha)' }} className="hover:opacity-70">
            <Icon name="x" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ─── Input field ──────────────────────────────────────────────
export function Field({ label, error, required, children }) {
  return (
    <div>
      {label && (
        <label className="label">
          {label}{required && <span style={{ color: '#b91c1c' }}> *</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#b91c1c' }}>{error}</p>}
    </div>
  )
}

export function Input({ label, error, required, className = '', ...props }) {
  return (
    <Field label={label} error={error} required={required}>
      <input className={`input ${error ? 'error' : ''} ${className}`} {...props} />
    </Field>
  )
}

export function Textarea({ label, error, required, className = '', ...props }) {
  return (
    <Field label={label} error={error} required={required}>
      <textarea className={`input resize-none ${error ? 'error' : ''} ${className}`} {...props} />
    </Field>
  )
}

export function Select({ label, error, required, children, className = '', ...props }) {
  return (
    <Field label={label} error={error} required={required}>
      <select className={`input ${error ? 'error' : ''} ${className}`} {...props}>
        {children}
      </select>
    </Field>
  )
}

// ─── Alert Banner ─────────────────────────────────────────────
export function AlertBanner({ type = 'success', children }) {
  const cls = { success: 'alert-success', info: 'alert-info', warning: 'alert-warning', danger: 'alert-danger' }[type]
  const icon = { success: 'check', info: 'info', warning: 'alert', danger: 'x' }[type]
  return (
    <div className={`${cls} rounded-xl px-4 py-3 flex items-center gap-3 mb-5`}>
      <Icon name={icon} size={17} />
      <span className="text-sm font-medium">{children}</span>
    </div>
  )
}

// ─── Bar Chart (simple CSS) ────────────────────────────────────
export function SimpleBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.revenue))
  return (
    <div className="flex items-end gap-2 h-28 mt-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{
              height: `${(d.revenue / max) * 100}%`,
              background: i === 4 ? 'var(--navy)' : 'var(--sand)',
              minHeight: 6,
            }}
          />
          <span className="text-xs font-mono" style={{ color: 'var(--mocha)' }}>{d.month}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────
export function ProgressBar({ value, max, color = 'var(--navy)' }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ height: 6, background: 'rgba(224,193,164,.3)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width .4s' }} />
    </div>
  )
}

export { Icon }
