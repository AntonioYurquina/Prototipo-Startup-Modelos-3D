import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BarChart3,
  Box,
  CheckCircle2,
  Check,
  Clock3,
  Copy,
  DollarSign,
  FileArchive,
  Funnel,
  Link2,
  MousePointerClick,
  Percent,
  Receipt,
  Search,
  ShoppingBag,
  Store,
  Upload,
  UserRound,
} from 'lucide-react'
import { EmptyState, Field, FormatBadge, ModelImage, SectionTitle } from '../components/common'
import { FunnelChart, ModelBars } from '../components/Charts'
import { FORMATS, emptyModelForm } from '../data'
import { btnDark, btnGhost, btnPrimary, cardCls, inputCls } from '../styles'
import { formatDateTime, formatNumber, formatPercent, formatUsd, normalize } from '../lib'

const pct = (part, total) => (total === 0 ? 0 : (part / total) * 100)

function Kpi({ icon: Icon, label, value, note }) {
  return (
    <div className={`${cardCls} p-4 md:p-5`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Icon size={16} aria-hidden="true" />
        </span>
        {label}
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{value}</p>
      <p className="mt-1 text-xs text-slate-600">{note}</p>
    </div>
  )
}

function StatusBadge({ status }) {
  const done = status === 'completed'
  const Icon = done ? CheckCircle2 : Clock3
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${
        done ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
      }`}
    >
      <Icon size={12} aria-hidden="true" />
      {done ? 'Completada' : 'Intento iniciado'}
    </span>
  )
}

const th = 'px-2 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 sm:px-3'
const td = 'px-2 py-3 sm:px-3'

function SalesFlow({ rows }) {
  return (
    <>
      <div className="mt-4 hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">Últimas ventas e intentos de compra</caption>
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th scope="col" className={th}>Fecha y hora</th>
              <th scope="col" className={th}>Modelo</th>
              <th scope="col" className={th}>Cliente</th>
              <th scope="col" className={`${th} text-right`}>Importe</th>
              <th scope="col" className={th}>Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ sale, model, client }) => (
              <tr key={sale.id}>
                <td className={`${td} tabular text-slate-700`}>{formatDateTime(sale.fechaHoraCompra)}</td>
                <td className={`${td} font-semibold text-slate-900`}>{model?.nombrePublicado || 'N/D'}</td>
                <td className={`${td} text-slate-700`}>{client ? `${client.nombre} (${client.telegram})` : 'Por completar'}</td>
                <td className={`${td} tabular text-right font-semibold text-slate-900`}>{model ? formatUsd(model.price) : '—'}</td>
                <td className={td}><StatusBadge status={sale.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 space-y-3 md:hidden">
        {rows.map(({ sale, model, client }) => (
          <li key={sale.id} className="rounded-xl border border-slate-200 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-slate-900">{model?.nombrePublicado || 'N/D'}</p>
              <p className="tabular font-bold text-slate-900">{model ? formatUsd(model.price) : '—'}</p>
            </div>
            <p className="mt-1 text-sm text-slate-700">{client ? `${client.nombre} (${client.telegram})` : 'Cliente por completar'}</p>
            <div className="mt-2.5 flex items-center justify-between gap-3">
              <StatusBadge status={sale.status} />
              <p className="tabular text-xs text-slate-600">{formatDateTime(sale.fechaHoraCompra)}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Panel({ models, stats, sales, clients, links, kpis, onAddModel, onGenerateLink, onGoStore }) {
  const [filter, setFilter] = useState('')
  const [modelForm, setModelForm] = useState(emptyModelForm)
  const [linkForm, setLinkForm] = useState({ modelId: models[0]?.id ?? '', cliente: '', expiresInHours: '24' })
  const [modelNotice, setModelNotice] = useState('')
  const [linkNotice, setLinkNotice] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const copyTimer = useRef(null)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const { buyClicks, completedSales, conversionRate, revenue, totalViews } = kpis
  const hasActivity = totalViews > 0 || sales.length > 0

  const filtered = useMemo(
    () => stats.filter((model) => normalize(model.nombrePublicado).includes(normalize(filter.trim()))),
    [stats, filter],
  )

  const chartRows = stats.slice(0, 6)
  const salesRows = sales.slice(0, 8).map((sale) => ({
    sale,
    model: models.find((item) => item.id === sale.modelId),
    client: clients.find((item) => item.id === sale.clientId),
  }))

  const setModel = (name) => (event) => setModelForm((prev) => ({ ...prev, [name]: event.target.value }))
  const setLink = (name) => (event) => setLinkForm((prev) => ({ ...prev, [name]: event.target.value }))

  const submitModel = (event) => {
    event.preventDefault()
    const created = onAddModel(modelForm)
    setModelForm(emptyModelForm)
    setLinkForm((prev) => ({ ...prev, modelId: created.id }))
    setModelNotice(`«${created.nombrePublicado}» ya está publicado en el catálogo.`)
  }

  const submitLink = (event) => {
    event.preventDefault()
    const created = onGenerateLink(linkForm)
    if (created) setLinkNotice('Link temporal generado. Copialo y enviáselo al cliente.')
  }

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link.url)
      setCopiedId(link.id)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopiedId(null), 2000)
    } catch {
      setLinkNotice('No pudimos copiar automáticamente. Seleccioná el link y copialo a mano.')
    }
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 data-view-heading tabIndex={-1} className="text-3xl font-semibold tracking-tight">
            Panel operativo
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Métricas de validación, gestión de modelos y links de entrega temporales.
          </p>
        </div>
        <p className="rounded-full bg-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700">
          Datos de demostración · se reinician al recargar
        </p>
      </header>

      <section aria-labelledby="kpi-title" className="space-y-4">
        <h3 id="kpi-title" className="sr-only">Indicadores clave</h3>
        <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
          <Kpi icon={MousePointerClick} label="Clics en comprar" value={formatNumber(buyClicks)} note="Intentos de compra iniciados" />
          <Kpi
            icon={ShoppingBag}
            label="Ventas simuladas"
            value={formatNumber(completedSales)}
            note={`${formatNumber(buyClicks - completedSales)} sin completar`}
          />
          <Kpi icon={Percent} label="Conversión" value={formatPercent(conversionRate)} note="Ventas sobre clics en comprar" />
          <Kpi
            icon={DollarSign}
            label="Ingresos simulados"
            value={formatUsd(revenue)}
            note={completedSales > 0 ? `Ticket promedio ${formatUsd(Math.round(revenue / completedSales))}` : 'Sin ventas todavía'}
          />
        </div>
      </section>

      <section aria-labelledby="charts-title">
        <h3 id="charts-title" className="sr-only">Gráficos de validación</h3>
        {hasActivity ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <article className={`${cardCls} p-5`}>
              <SectionTitle icon={Funnel}>Embudo de conversión</SectionTitle>
              <p className="mb-5 mt-1 text-sm text-slate-600">De la visita a la compra completada.</p>
              <FunnelChart
                stages={[
                  { label: 'Vistas de modelos', value: totalViews, note: 'Detalles abiertos y clics en comprar' },
                  { label: 'Clics en comprar', value: buyClicks, note: `${formatPercent(pct(buyClicks, totalViews))} de las vistas` },
                  { label: 'Ventas completadas', value: completedSales, note: `${formatPercent(pct(completedSales, buyClicks))} de los clics` },
                ]}
              />
            </article>
            <article className={`${cardCls} p-5`}>
              <SectionTitle icon={BarChart3}>Interés por modelo</SectionTitle>
              <p className="mb-4 mt-1 text-sm text-slate-600">Vistas y clics en comprar de cada modelo.</p>
              <ModelBars rows={chartRows} />
              {stats.length > chartRows.length && (
                <p className="mt-4 text-xs text-slate-600">
                  Mostrando los {chartRows.length} más vistos. El resto está en la tabla.
                </p>
              )}
            </article>
          </div>
        ) : (
          <EmptyState
            icon={BarChart3}
            title="Todavía no hay actividad para graficar"
            action={
              <button type="button" onClick={onGoStore} className={btnPrimary}>
                <Store size={16} aria-hidden="true" />
                Ir a la tienda y probar una compra
              </button>
            }
          >
            Abrí un modelo o hacé clic en Comprar en la tienda: las métricas y gráficos se actualizan al instante.
          </EmptyState>
        )}
      </section>

      <section className={`${cardCls} p-5`} aria-labelledby="rend-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle icon={Box} id="rend-title">Rendimiento por modelo</SectionTitle>
          <div className="w-full sm:w-72">
            <label htmlFor="filtro-modelos" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Filtrar modelos
            </label>
            <div className="relative">
              <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="filtro-modelos"
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Buscar por nombre"
                autoComplete="off"
                className={`${inputCls} pl-9`}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Vistas, clics y ventas por modelo</caption>
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th scope="col" className={th}>Modelo</th>
                <th scope="col" className={`${th} hidden sm:table-cell`}>Formato</th>
                <th scope="col" className={`${th} text-right`}>Vistas</th>
                <th scope="col" className={`${th} text-right`}>Clics</th>
                <th scope="col" className={`${th} text-right`}>Ventas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((model) => (
                <tr key={model.id}>
                  <th scope="row" className={`${td} text-left font-semibold text-slate-900`}>
                    <span className="flex items-center gap-3">
                      <ModelImage key={model.id} model={model} className="hidden h-10 w-14 shrink-0 rounded-md sm:block" />
                      <span>
                        {model.nombrePublicado}
                        <span className="mt-1 block sm:hidden"><FormatBadge formato={model.formato} /></span>
                      </span>
                    </span>
                  </th>
                  <td className={`${td} hidden sm:table-cell`}><FormatBadge formato={model.formato} /></td>
                  <td className={`${td} tabular text-right text-slate-800`}>{formatNumber(model.views)}</td>
                  <td className={`${td} tabular text-right text-slate-800`}>{formatNumber(model.clicks)}</td>
                  <td className={`${td} tabular text-right text-slate-800`}>{formatNumber(model.completed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-slate-600">Ningún modelo coincide con «{filter}».</p>
          )}
        </div>
      </section>

      <section className={`${cardCls} p-5`} aria-labelledby="flujo-title">
        <SectionTitle icon={Receipt} id="flujo-title">Flujo de ventas</SectionTitle>
        {salesRows.length > 0 ? (
          <SalesFlow rows={salesRows} />
        ) : (
          <EmptyState
            className="mt-4"
            icon={Receipt}
            title="Todavía no hay ventas ni intentos"
            action={
              <button type="button" onClick={onGoStore} className={btnGhost}>
                Ir a la tienda
              </button>
            }
          >
            Cada clic en Comprar aparece acá como «Intento iniciado» y pasa a «Completada» al confirmar el checkout.
          </EmptyState>
        )}
      </section>

      <section aria-labelledby="operacion-title" className="space-y-4">
        <div>
          <h3 id="operacion-title" className="text-2xl font-semibold tracking-tight">Operación</h3>
          <p className="mt-1 text-sm text-slate-600">Publicá modelos nuevos y generá los links de descarga para tus clientes.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <article className={`${cardCls} p-5`}>
            <SectionTitle icon={Box}>Gestión de modelos</SectionTitle>
            <form className="mt-5 space-y-4" onSubmit={submitModel}>
              <Field id="mf-nombre" label="Nombre del producto" required value={modelForm.nombrePublicado} onChange={setModel('nombrePublicado')} placeholder="Ej.: Sci-Fi Crate Pack" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="mf-formato" label="Formato" as="select" required value={modelForm.formato} onChange={setModel('formato')}>
                  {FORMATS.map((format) => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </Field>
                <Field id="mf-precio" label="Precio (USD)" type="number" min="1" inputMode="numeric" required value={modelForm.price} onChange={setModel('price')} />
              </div>
              <Field id="mf-path" label="Path del archivo (simulado)" icon={Upload} required value={modelForm.filePath} onChange={setModel('filePath')} placeholder="/simulado/storage/mi-modelo.zip" />
              <Field id="mf-zip" label="Nombre del ZIP" icon={FileArchive} required value={modelForm.zipName} onChange={setModel('zipName')} placeholder="mi-modelo.zip" />
              <Field
                id="mf-imagenes"
                label="URLs de imagen (opcional)"
                as="textarea"
                rows="3"
                value={modelForm.imagesRaw}
                onChange={setModel('imagesRaw')}
                hint="Separadas por coma o nueva línea. Si lo dejás vacío, el catálogo muestra un marcador de posición."
              />
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className={btnDark}>Guardar modelo</button>
                {modelNotice && (
                  <p role="status" className="flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {modelNotice}
                  </p>
                )}
              </div>
            </form>
          </article>

          <article className={`${cardCls} p-5`}>
            <SectionTitle icon={Link2}>Generador de links</SectionTitle>
            <form className="mt-5 space-y-4" onSubmit={submitLink}>
              <Field id="lf-modelo" label="Modelo" as="select" required value={linkForm.modelId} onChange={setLink('modelId')}>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>{model.nombrePublicado}</option>
                ))}
              </Field>
              <Field id="lf-cliente" label="Cliente (opcional)" icon={UserRound} value={linkForm.cliente} onChange={setLink('cliente')} placeholder="@cliente_telegram" />
              <Field id="lf-horas" label="Expiración en horas" icon={Clock3} type="number" min="1" inputMode="numeric" required value={linkForm.expiresInHours} onChange={setLink('expiresInHours')} />
              <button type="submit" className={btnPrimary}>Generar link temporal</button>
            </form>

            <div className="mt-5" aria-live="polite">
              {linkNotice && <p className="mb-3 text-sm font-semibold text-emerald-800">{linkNotice}</p>}
            </div>
            {links.length > 0 ? (
              <ul className="space-y-2">
                {links.slice(0, 3).map((link) => (
                  <li key={link.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="break-all font-mono text-xs font-medium text-slate-800">{link.url}</p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-slate-600">
                        {link.cliente} · vence {formatDateTime(link.expiresAt)}
                      </p>
                      <button
                        type="button"
                        onClick={() => copyLink(link)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-100"
                      >
                        {copiedId === link.id ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                        {copiedId === link.id ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                Todavía no generaste links. Cuando lo hagas, aparecen acá con su vencimiento.
              </p>
            )}
          </article>
        </div>
      </section>
    </div>
  )
}
