import { formatNumber } from '../lib'

const FUNNEL_COLORS = ['#86b6ef', '#2a78d6', '#184f95']
const SERIES = { views: '#2a78d6', clicks: '#eb6834' }

const barWidth = (value, max) => `calc((100% - 3rem) * ${max === 0 ? 0 : value / max})`

export function FunnelChart({ stages }) {
  const max = Math.max(...stages.map((stage) => stage.value), 0)
  return (
    <ol className="space-y-5">
      {stages.map((stage, index) => (
        <li key={stage.label}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-semibold text-slate-800">{stage.label}</span>
            <span className="text-xs text-slate-600">{stage.note}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 border-l border-slate-300">
            <div
              aria-hidden="true"
              className="h-5 rounded-r bg-slate-300 transition-[width] duration-500"
              style={{
                width: barWidth(stage.value, max),
                minWidth: stage.value > 0 ? 4 : 0,
                backgroundColor: FUNNEL_COLORS[index] ?? FUNNEL_COLORS[2],
              }}
            />
            <span className="tabular text-sm font-bold text-slate-900">{formatNumber(stage.value)}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function ModelBars({ rows }) {
  const max = Math.max(...rows.flatMap((row) => [row.views, row.clicks]), 0)
  const series = [
    ['views', 'Vistas'],
    ['clicks', 'Clics en comprar'],
  ]
  return (
    <div>
      <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-700">
        {series.map(([key, label]) => (
          <li key={key} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: SERIES[key] }} />
            {label}
          </li>
        ))}
      </ul>
      <ul className="space-y-4">
        {rows.map((row) => (
          <li key={row.id}>
            <p className="truncate text-sm font-semibold text-slate-800">{row.nombrePublicado}</p>
            <div className="mt-1.5 space-y-0.5 border-l border-slate-300">
              {series.map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    aria-hidden="true"
                    className="h-3 rounded-r transition-[width] duration-500"
                    style={{
                      width: barWidth(row[key], max),
                      minWidth: row[key] > 0 ? 4 : 0,
                      backgroundColor: SERIES[key],
                    }}
                  />
                  <span className="tabular text-xs font-bold text-slate-900">
                    {formatNumber(row[key])}
                    <span className="sr-only"> {label.toLowerCase()}</span>
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
