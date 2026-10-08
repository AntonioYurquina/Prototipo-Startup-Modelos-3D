const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

export const btnPrimary = `${btnBase} bg-orange-500 text-slate-950 shadow-sm hover:bg-orange-400 active:bg-orange-600`
export const btnDark = `${btnBase} bg-slate-900 text-white shadow-sm hover:bg-slate-700 active:bg-slate-950`
export const btnGhost = `${btnBase} border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 active:bg-slate-200`

export const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-colors hover:border-slate-400 focus:border-blue-700 aria-[invalid=true]:border-red-700 aria-[invalid=true]:bg-red-50'

export const cardCls = 'rounded-2xl border border-slate-200 bg-white shadow-sm'
