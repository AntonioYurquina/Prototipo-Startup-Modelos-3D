import { CheckCircle2, Mail, Store } from 'lucide-react'
import { ModelImage } from '../components/common'
import { btnGhost, btnPrimary, cardCls } from '../styles'
import { formatDateTime, formatUsd, shortId } from '../lib'

export default function Confirmation({ order, onContinue, onSeePanel }) {
  const { sale, model, customer } = order

  return (
    <div className="mx-auto max-w-2xl animate-fade-up">
      <section className={`${cardCls} overflow-hidden`} aria-labelledby="confirm-title">
        <div className="bg-emerald-50 px-6 py-8 text-center md:px-10">
          <span className="mx-auto flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/30">
            <CheckCircle2 size={34} aria-hidden="true" />
          </span>
          <h2 id="confirm-title" data-view-heading tabIndex={-1} className="mt-4 text-3xl font-semibold tracking-tight text-emerald-950">
            ¡Compra simulada confirmada!
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-emerald-950/80">
            Gracias, {customer.nombre.trim().split(' ')[0]}. Registramos la venta y el panel operativo ya la refleja.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4">
            <ModelImage model={model} className="h-20 w-28 shrink-0 rounded-lg" />
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-slate-900">{model.nombrePublicado}</p>
              <p className="text-sm text-slate-600">
                <span className="font-mono text-xs">{model.formato} · {model.zipName}</span>
              </p>
            </div>
          </div>

          <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-slate-200 pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-600">N.º de pedido</dt>
              <dd className="font-mono font-bold text-slate-900">#{shortId(sale.id)}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Fecha</dt>
              <dd className="font-semibold text-slate-900">{formatDateTime(sale.fechaHoraCompra)}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Total</dt>
              <dd className="font-bold text-slate-900">{formatUsd(model.price)}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Comprobante a</dt>
              <dd className="break-all font-semibold text-slate-900">{customer.email.trim()}</dd>
            </div>
          </dl>

          <p className="mt-6 flex gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
            <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-slate-600" />
            Próximo paso: el operador genera un link de descarga temporal y te lo envía por email
            {customer.telegram.trim() ? ` y Telegram (${customer.telegram.trim()})` : ''}.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onContinue} className={`${btnPrimary} sm:flex-1`}>
              <Store size={16} aria-hidden="true" />
              Seguir explorando
            </button>
            <button type="button" onClick={onSeePanel} className={`${btnGhost} sm:flex-1`}>
              Ver en el panel operativo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
