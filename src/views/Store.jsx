import { useMemo, useState } from 'react'
import { Download, Search, SearchX, ShieldCheck, ShoppingCart, Sparkles } from 'lucide-react'
import { EmptyState, FormatBadge, ModelImage } from '../components/common'
import { FORMATS, SORT_OPTIONS } from '../data'
import { btnGhost, btnPrimary, cardCls, inputCls } from '../styles'
import { formatUsd, normalize } from '../lib'

const sorters = {
  destacados: () => 0,
  'precio-asc': (a, b) => a.price - b.price,
  'precio-desc': (a, b) => b.price - a.price,
  nombre: (a, b) => a.nombrePublicado.localeCompare(b.nombrePublicado, 'es'),
}

function ModelCard({ model, isNew, onOpen, onBuy }) {
  return (
    <li className="h-full">
      <article
        className={`${cardCls} group flex h-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lg motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => onOpen(model)}
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-none"
        >
          <ModelImage
            key={model.id}
            model={model}
            className="h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
          <FormatBadge formato={model.formato} className="absolute left-3 top-3 shadow" />
          {isNew && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-slate-950 shadow">
              <Sparkles size={12} aria-hidden="true" /> Nuevo
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col p-4 md:p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600">{model.categoria || 'Modelo 3D'}</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-slate-900">{model.nombrePublicado}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {model.descripcion || `Modelo 3D en formato ${model.formato}, listo para usar.`}
          </p>
          <button
            type="button"
            onClick={() => onOpen(model)}
            className="mt-2 w-fit rounded text-sm font-semibold text-blue-800 underline decoration-blue-800/30 underline-offset-4 hover:decoration-blue-800"
          >
            Ver detalle<span className="sr-only"> de {model.nombrePublicado}</span>
          </button>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              <p className="text-xs font-medium text-slate-600">Precio</p>
              <p className="text-2xl font-bold leading-none tracking-tight text-slate-900">{formatUsd(model.price)}</p>
            </div>
            <button type="button" onClick={() => onBuy(model)} className={btnPrimary}>
              <ShoppingCart size={16} aria-hidden="true" />
              Comprar<span className="sr-only"> {model.nombrePublicado}</span>
            </button>
          </div>
        </div>
      </article>
    </li>
  )
}

export default function Store({ models, newIds, onOpen, onBuy }) {
  const [query, setQuery] = useState('')
  const [format, setFormat] = useState('todos')
  const [sort, setSort] = useState('destacados')

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    return models
      .filter((model) => (format === 'todos' || model.formato === format) && normalize(model.nombrePublicado).includes(q))
      .sort(sorters[sort])
  }, [models, query, format, sort])

  const hasFilters = query !== '' || format !== 'todos'
  const clearFilters = () => {
    setQuery('')
    setFormat('todos')
  }

  const formatOptions = ['todos', ...FORMATS]
  const countFor = (f) => (f === 'todos' ? models.length : models.filter((m) => m.formato === f).length)

  return (
    <div className="space-y-8 animate-fade-up">
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-900/20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(600px_300px_at_90%_0%,rgba(249,115,22,0.45),transparent_70%),radial-gradient(500px_280px_at_0%_100%,rgba(37,99,235,0.35),transparent_70%)]"
        />
        <div className="relative px-6 py-9 md:px-10 md:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Marketplace de modelos 3D</p>
          <h2
            id="hero-title"
            data-view-heading
            tabIndex={-1}
            className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl md:leading-[1.1]"
          >
            Comprá modelos 3D listos para producción, hoy mismo.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Assets curados en formatos .obj, .stl y .fbx. Elegí uno, pasá por el checkout simulado y mirá cómo se
            refleja en el panel operativo.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-slate-100">
            {[
              [Download, 'Descarga por link temporal'],
              [ShieldCheck, 'Sin cobros reales'],
              [Sparkles, 'Formatos .obj · .stl · .fbx'],
            ].map(([Icon, text]) => (
              <li key={text} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15">
                <Icon size={14} aria-hidden="true" className="text-orange-300" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="catalogo-title">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="catalogo-title" className="text-2xl font-semibold tracking-tight">
            Catálogo
          </h2>
          <p role="status" className="text-sm text-slate-600">
            {visible.length === models.length
              ? `${models.length} ${models.length === 1 ? 'modelo' : 'modelos'}`
              : `${visible.length} de ${models.length} modelos`}
          </p>
        </div>

        <div className={`${cardCls} mt-4 grid gap-4 p-4 md:grid-cols-[1fr_220px] md:items-end`}>
          <div>
            <label htmlFor="buscar" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Buscar por nombre
            </label>
            <div className="relative">
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                id="buscar"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej.: drone, café, urbano"
                autoComplete="off"
                className={`${inputCls} pl-9`}
              />
            </div>
          </div>
          <div>
            <label htmlFor="orden" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Ordenar por
            </label>
            <select id="orden" value={sort} onChange={(event) => setSort(event.target.value)} className={inputCls}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div role="group" aria-labelledby="formato-label" className="md:col-span-2">
            <p id="formato-label" className="mb-1.5 text-sm font-semibold text-slate-800">
              Formato
            </p>
            <div className="flex flex-wrap gap-2">
              {formatOptions.map((option) => {
                const active = format === option
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFormat(option)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span className={option === 'todos' ? '' : 'font-mono text-xs'}>
                      {option === 'todos' ? 'Todos' : option}
                    </span>
                    <span className={`text-xs ${active ? 'text-slate-300' : 'text-slate-600'}`}>{countFor(option)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((model) => (
              <ModelCard key={model.id} model={model} isNew={newIds.has(model.id)} onOpen={onOpen} onBuy={onBuy} />
            ))}
          </ul>
        ) : (
          <EmptyState
            className="mt-5"
            icon={SearchX}
            title="No encontramos modelos con esos filtros"
            action={
              <button type="button" onClick={clearFilters} className={btnGhost}>
                Limpiar filtros
              </button>
            }
          >
            {hasFilters ? 'Probá con otra palabra o elegí otro formato.' : 'Todavía no hay modelos publicados.'}
          </EmptyState>
        )}
      </section>
    </div>
  )
}
