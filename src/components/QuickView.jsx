import { useEffect, useRef } from 'react'
import { FileArchive, Mail, ShoppingCart, X } from 'lucide-react'
import { FormatBadge, ModelImage } from './common'
import { btnGhost, btnPrimary } from '../styles'
import { formatUsd } from '../lib'

export default function QuickView({ model, onClose, onBuy }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quickview-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
      className="m-auto max-h-[92vh] w-[min(94vw,760px)] overflow-auto rounded-2xl border-0 bg-white p-0 text-slate-900 shadow-2xl animate-pop-in"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative">
          <ModelImage model={model} className="aspect-[4/3] md:h-full md:aspect-auto md:min-h-[320px]" />
          <FormatBadge formato={model.formato} className="absolute left-3 top-3" />
        </div>

        <div className="flex flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">{model.categoria || 'Modelo 3D'}</p>
            <button
              type="button"
              onClick={() => dialogRef.current.close()}
              aria-label="Cerrar detalle"
              className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <h2 id="quickview-title" className="mt-1 text-2xl font-semibold leading-tight">
            {model.nombrePublicado}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {model.descripcion || 'Modelo 3D publicado por el operador, listo para descargar tras la compra.'}
          </p>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <FileArchive size={16} aria-hidden="true" className="text-slate-600" />
              <dt className="sr-only">Archivo</dt>
              <dd>
                Archivo <span className="font-mono text-xs">{model.zipName}</span>
              </dd>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail size={16} aria-hidden="true" className="text-slate-600" />
              <dt className="sr-only">Entrega</dt>
              <dd>Link de descarga temporal por email o Telegram</dd>
            </div>
          </dl>

          <div className="mt-auto pt-6">
            <p className="text-xs font-medium text-slate-600">Precio</p>
            <p className="text-3xl font-bold tracking-tight">{formatUsd(model.price)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => onBuy(model)} className={`${btnPrimary} flex-1`}>
                <ShoppingCart size={16} aria-hidden="true" />
                Comprar ahora
              </button>
              <button type="button" onClick={() => dialogRef.current.close()} className={btnGhost}>
                Seguir mirando
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
