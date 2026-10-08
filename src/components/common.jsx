import { useState } from 'react'
import { AlertCircle, Box, Loader2 } from 'lucide-react'
import { inputCls } from '../styles'

export function ModelImage({ model, className = '' }) {
  const [status, setStatus] = useState('loading')
  const image = model.images?.[0]
  const showFallback = !image || status === 'error'

  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {showFallback ? (
        <div
          role="img"
          aria-label={`Sin vista previa de ${model.nombrePublicado}`}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 via-slate-200 to-orange-100 text-slate-600"
        >
          <Box size={40} strokeWidth={1.5} aria-hidden="true" />
          <span className="text-xs font-semibold">Sin vista previa</span>
        </div>
      ) : (
        <>
          {status === 'loading' && (
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,#e2e8f0_25%,#f1f5f9_50%,#e2e8f0_75%)] bg-[length:200%_100%]"
            />
          )}
          <img
            src={image.url}
            alt={`Vista previa de ${model.nombrePublicado}`}
            loading="lazy"
            ref={(el) => {
              if (el?.complete && el.naturalWidth > 0) setStatus('loaded')
            }}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              status === 'loaded' ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </div>
  )
}

export function FormatBadge({ formato, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-slate-900 px-2 py-1 font-mono text-xs font-bold text-white ${className}`}
    >
      {formato}
    </span>
  )
}

export function Field({
  id,
  label,
  icon: Icon,
  hint,
  error,
  required = false,
  as: Tag = 'input',
  className = '',
  children,
  ...props
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
        {Icon && <Icon size={14} aria-hidden="true" className="text-slate-600" />}
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red-700">
            *
          </span>
        ) : null}
      </label>
      <Tag
        id={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={inputCls}
        {...props}
      >
        {children}
      </Tag>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-red-700">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, children, action, className = '' }) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
        <Icon size={22} aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-slate-600">{children}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Spinner({ size = 16 }) {
  return <Loader2 size={size} aria-hidden="true" className="animate-spin" />
}

export function SectionTitle({ icon: Icon, children, id }) {
  return (
    <h3 id={id} className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
        <Icon size={16} aria-hidden="true" />
      </span>
      {children}
    </h3>
  )
}
