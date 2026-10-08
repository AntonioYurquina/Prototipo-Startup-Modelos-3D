import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Check, Download, Info, LockKeyhole, Mail, ShoppingCart } from 'lucide-react'
import { Field, FormatBadge, ModelImage, Spinner } from '../components/common'
import { btnGhost, btnPrimary, cardCls } from '../styles'
import { formatUsd } from '../lib'

const STEPS = ['Elegiste el modelo', 'Tus datos', 'Confirmación']

function Stepper({ current }) {
  return (
    <ol className="flex items-center gap-2 text-sm" aria-label="Pasos de la compra">
      {STEPS.map((label, index) => {
        const done = index < current
        const active = index === current
        return (
          <li
            key={label}
            aria-current={active ? 'step' : undefined}
            className={`flex items-center gap-2 ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                done
                  ? 'bg-emerald-700 text-white'
                  : active
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-400 bg-white text-slate-700'
              }`}
            >
              {done ? <Check size={14} aria-hidden="true" /> : index + 1}
            </span>
            <span className={`${active ? 'font-bold text-slate-900' : 'text-slate-600'} ${active ? '' : 'hidden sm:inline'}`}>
              {label}
              <span className="sr-only">{done ? ' (completado)' : active ? ' (paso actual)' : ''}</span>
            </span>
            {index < STEPS.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-slate-300 sm:block" />}
          </li>
        )
      })}
    </ol>
  )
}

function validate(values) {
  const errors = {}
  if (!values.nombre.trim()) errors.nombre = 'Ingresá tu nombre.'
  if (!values.email.trim()) errors.email = 'Ingresá tu email para recibir el link de descarga.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Revisá el email, parece incompleto (ej.: nombre@correo.com).'
  if (values.telegram.trim() && !/^@?[A-Za-z0-9_]{5,32}$/.test(values.telegram.trim()))
    errors.telegram = 'Usá entre 5 y 32 letras, números o guiones bajos (ej.: @usuario).'
  return errors
}

export default function Checkout({ model, onConfirm, onCancel }) {
  const [values, setValues] = useState({ nombre: '', email: '', telegram: '' })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const setField = (name) => (event) => {
    setValues((prev) => ({ ...prev, [name]: event.target.value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const submit = (event) => {
    event.preventDefault()
    if (processing) return
    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`co-${firstInvalid}`)?.focus()
      return
    }
    setProcessing(true)
    timer.current = setTimeout(() => onConfirm(values), 1100)
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <button type="button" onClick={onCancel} className="mb-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-slate-700 hover:text-slate-950">
          <ArrowLeft size={16} aria-hidden="true" /> Volver al catálogo
        </button>
        <Stepper current={1} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <aside aria-label="Resumen del pedido" className="lg:col-start-2 lg:row-start-1">
          <div className={`${cardCls} overflow-hidden lg:sticky lg:top-24`}>
            <ModelImage key={model.id} model={model} className="aspect-[16/9] w-full" />
            <div className="p-5">
              <FormatBadge formato={model.formato} />
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{model.nombrePublicado}</h3>
              <p className="mt-1 text-sm text-slate-600">
                Archivo <span className="font-mono text-xs">{model.zipName}</span>
              </p>
              <dl className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
                <div className="flex justify-between text-slate-700">
                  <dt>Subtotal</dt>
                  <dd className="tabular">{formatUsd(model.price)}</dd>
                </div>
                <div className="flex justify-between text-slate-700">
                  <dt>Entrega digital</dt>
                  <dd>Sin costo</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-slate-200 pt-3">
                  <dt className="font-semibold text-slate-900">Total</dt>
                  <dd className="text-2xl font-bold tabular text-slate-900">{formatUsd(model.price)}</dd>
                </div>
              </dl>
              <p className="mt-4 flex gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                <Download size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                Después de confirmar, el operador genera un link de descarga temporal que expira en 24 horas.
              </p>
            </div>
          </div>
        </aside>

        <section className={`${cardCls} p-5 md:p-7 lg:col-start-1 lg:row-start-1`} aria-labelledby="checkout-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Checkout seguro</p>
          <h2 id="checkout-title" data-view-heading tabIndex={-1} className="mt-1 text-2xl font-semibold tracking-tight">
            Finalizá tu compra
          </h2>

          <p className="mt-4 flex gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950">
            <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>
              Es una simulación de pago: no se realiza ningún cobro y los datos quedan solo en tu navegador.
            </span>
          </p>

          <form className="mt-6 space-y-5" onSubmit={submit} noValidate aria-busy={processing}>
            {errorCount > 0 && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
                Revisá {errorCount === 1 ? 'el campo marcado' : `los ${errorCount} campos marcados`} para continuar.
              </p>
            )}
            <Field
              id="co-nombre"
              label="Nombre y apellido"
              required
              autoComplete="name"
              value={values.nombre}
              onChange={setField('nombre')}
              error={errors.nombre}
              disabled={processing}
            />
            <Field
              id="co-email"
              label="Email"
              icon={Mail}
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={setField('email')}
              error={errors.email}
              hint="Te enviamos el comprobante y el link de descarga."
              disabled={processing}
            />
            <Field
              id="co-telegram"
              label="Usuario de Telegram (opcional)"
              placeholder="@usuario"
              autoComplete="off"
              value={values.telegram}
              onChange={setField('telegram')}
              error={errors.telegram}
              hint="Si lo completás, también podemos entregarte el link por Telegram."
              disabled={processing}
            />

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button type="submit" disabled={processing} className={`${btnPrimary} w-full py-3 text-base sm:w-auto`}>
                {processing ? <Spinner /> : <ShoppingCart size={18} aria-hidden="true" />}
                {processing ? 'Procesando pago simulado…' : `Confirmar compra · ${formatUsd(model.price)}`}
              </button>
              <button type="button" onClick={onCancel} disabled={processing} className={`${btnGhost} w-full py-3 sm:w-auto`}>
                Cancelar
              </button>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-slate-600">
              <LockKeyhole size={13} aria-hidden="true" /> Simulación sin pasarela de pago real.
            </p>
          </form>
        </section>
      </div>
    </div>
  )
}
