import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, ExternalLink, LayoutDashboard, Store } from 'lucide-react'
import { seedModels } from './data'
import QuickView from './components/QuickView'
import StoreView from './views/Store'
import Checkout from './views/Checkout'
import Confirmation from './views/Confirmation'
import Panel from './views/Panel'

const REPO_URL = 'https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D'

function NavButton({ active, onClick, icon: Icon, children, badge, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-bold transition-colors sm:px-4 ${
        active ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/70'
      } ${className}`}
    >
      <Icon size={18} aria-hidden="true" />
      {children}
      {badge > 0 && (
        <span className="ml-0.5 min-w-5 rounded-full bg-orange-500 px-1.5 text-center text-xs font-bold leading-5 text-slate-950">
          {badge}
          <span className="sr-only"> clics en comprar</span>
        </span>
      )}
    </button>
  )
}

function App() {
  const [activeView, setActiveView] = useState('cliente')
  const [models, setModels] = useState(seedModels)
  const [clients, setClients] = useState([])
  const [sales, setSales] = useState([])
  const [checkout, setCheckout] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  const [quickView, setQuickView] = useState(null)
  const [generatedLinks, setGeneratedLinks] = useState([])
  const [viewCounters, setViewCounters] = useState(
    seedModels.reduce((acc, model) => {
      acc[model.id] = 0
      return acc
    }, {}),
  )
  const mainRef = useRef(null)

  const buyClicks = sales.length
  const completedSales = sales.filter((sale) => sale.status === 'completed').length
  const conversionRate = buyClicks === 0 ? 0 : (completedSales / buyClicks) * 100

  const modelsWithStats = useMemo(
    () =>
      models
        .map((model) => {
          const views = viewCounters[model.id] || 0
          const modelSales = sales.filter((sale) => sale.modelId === model.id)
          const completed = modelSales.filter((sale) => sale.status === 'completed').length
          return { ...model, views, clicks: modelSales.length, completed }
        })
        .sort((a, b) => b.views - a.views),
    [models, sales, viewCounters],
  )

  const kpis = useMemo(() => {
    const priceOf = (modelId) => models.find((model) => model.id === modelId)?.price ?? 0
    return {
      buyClicks,
      completedSales,
      conversionRate,
      totalViews: Object.values(viewCounters).reduce((sum, value) => sum + value, 0),
      revenue: sales
        .filter((sale) => sale.status === 'completed')
        .reduce((sum, sale) => sum + priceOf(sale.modelId), 0),
    }
  }, [buyClicks, completedSales, conversionRate, models, sales, viewCounters])

  const newIds = useMemo(
    () => new Set(models.filter((model) => !seedModels.some((seed) => seed.id === model.id)).map((model) => model.id)),
    [models],
  )

  const viewKey = `${activeView}|${checkout?.saleId ?? ''}|${confirmation?.sale.id ?? ''}`
  const lastViewKey = useRef(viewKey)
  useEffect(() => {
    if (lastViewKey.current === viewKey) return
    lastViewKey.current = viewKey
    window.scrollTo({ top: 0 })
    mainRef.current?.querySelector('[data-view-heading]')?.focus({ preventScroll: true })
  }, [viewKey])

  const trackModelView = (modelId) => {
    setViewCounters((prev) => ({ ...prev, [modelId]: (prev[modelId] || 0) + 1 }))
  }

  const openQuickView = (model) => {
    trackModelView(model.id)
    setQuickView(model)
  }

  const startCheckout = (model) => {
    const saleId = `sale-${crypto.randomUUID()}`
    const newSale = {
      id: saleId,
      modelId: model.id,
      clientId: null,
      fechaHoraCompra: new Date().toISOString(),
      status: 'initiated',
      checkoutProvider: 'Mercado Libre (simulado)',
    }

    trackModelView(model.id)
    setSales((prev) => [newSale, ...prev])
    setQuickView(null)
    setConfirmation(null)
    setCheckout({ saleId, model })
    setActiveView('cliente')
  }

  const completeCheckout = (customer) => {
    if (!checkout) {
      return
    }

    const normalizedEmail = customer.email.trim().toLowerCase()
    let selectedClient = clients.find((client) => client.email === normalizedEmail)

    if (!selectedClient) {
      selectedClient = {
        id: `cli-${crypto.randomUUID()}`,
        nombre: customer.nombre.trim() || 'Cliente MVP',
        email: normalizedEmail || `cliente-${Date.now()}@demo.local`,
        telegram: customer.telegram.trim() || '@pendiente',
      }
      setClients((prev) => [selectedClient, ...prev])
    }

    const completedAt = new Date().toISOString()
    const baseSale = sales.find((sale) => sale.id === checkout.saleId)
    const completedSale = { ...baseSale, status: 'completed', clientId: selectedClient.id, fechaHoraCompra: completedAt }

    setSales((prev) => prev.map((sale) => (sale.id === checkout.saleId ? completedSale : sale)))
    setConfirmation({ sale: completedSale, model: checkout.model, customer })
    setCheckout(null)
  }

  const submitModel = (form) => {
    const modelId = `mdl-${crypto.randomUUID()}`
    const imageUrls = form.imagesRaw
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter(Boolean)

    const newModel = {
      id: modelId,
      nombrePublicado: form.nombrePublicado.trim(),
      formato: form.formato,
      zipName: form.zipName.trim(),
      filePath: form.filePath.trim(),
      price: Number(form.price),
      images: imageUrls.map((url, index) => ({ id: `img-${modelId}-${index + 1}`, modelId, url })),
    }

    setModels((prev) => [newModel, ...prev])
    setViewCounters((prev) => ({ ...prev, [modelId]: 0 }))
    return newModel
  }

  const generateTempLink = (form) => {
    const selectedModel = models.find((model) => model.id === form.modelId)
    if (!selectedModel) {
      return null
    }

    const expiresAt = new Date(Date.now() + Number(form.expiresInHours) * 3600000)
    const token = crypto.randomUUID().replaceAll('-', '').slice(0, 16)
    const link = {
      id: `lnk-${crypto.randomUUID()}`,
      modelId: selectedModel.id,
      cliente: form.cliente.trim() || 'cliente-mvp',
      url: `https://descargas.protomodelos.com/tmp/${token}?zip=${selectedModel.zipName}`,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    }

    setGeneratedLinks((prev) => [link, ...prev])
    return link
  }

  const goStore = () => {
    if (activeView === 'cliente') {
      setCheckout(null)
      setConfirmation(null)
    }
    setActiveView('cliente')
  }
  const goPanel = () => setActiveView('panel')

  const nav = (
    <>
      <NavButton active={activeView === 'cliente'} onClick={goStore} icon={Store} className="flex-1 md:flex-none">
        Vista cliente
      </NavButton>
      <NavButton
        active={activeView === 'panel'}
        onClick={goPanel}
        icon={LayoutDashboard}
        badge={buyClicks}
        className="flex-1 md:flex-none"
      >
        Panel operativo
      </NavButton>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col text-slate-900">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-orange-400 shadow-sm">
              <Box size={22} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-slate-600">MVP Lean Startup</p>
              <h1 className="mt-1 text-xl font-semibold leading-none tracking-tight">
                <button type="button" onClick={goStore} className="rounded">
                  Mercado 3D<span className="sr-only">, ir a la tienda</span>
                </button>
              </h1>
            </div>
          </div>
          <nav aria-label="Principal" className="hidden gap-1 rounded-2xl bg-slate-100 p-1 md:flex">
            {nav}
          </nav>
        </div>
      </header>

      <main id="contenido" ref={mainRef} className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-28 md:px-8 md:py-10 md:pb-10">
        {activeView === 'cliente' ? (
          checkout ? (
            <Checkout key={checkout.saleId} model={checkout.model} onConfirm={completeCheckout} onCancel={() => setCheckout(null)} />
          ) : confirmation ? (
            <Confirmation order={confirmation} onContinue={() => setConfirmation(null)} onSeePanel={() => { setConfirmation(null); goPanel() }} />
          ) : (
            <StoreView models={models} newIds={newIds} onOpen={openQuickView} onBuy={startCheckout} />
          )
        ) : (
          <Panel
            models={models}
            stats={modelsWithStats}
            sales={sales}
            clients={clients}
            links={generatedLinks}
            kpis={kpis}
            onAddModel={submitModel}
            onGenerateLink={generateTempLink}
            onGoStore={goStore}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5 pb-28 text-sm text-slate-600 md:px-8 md:pb-5">
          <p>Prototipo de validación (MVP) con datos simulados. No se realizan cobros reales.</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-800"
          >
            Código en GitHub <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </div>
      </footer>

      <nav
        aria-label="Principal (móvil)"
        className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-slate-200 bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
      >
        {nav}
      </nav>

      {quickView && <QuickView key={quickView.id} model={quickView} onClose={() => setQuickView(null)} onBuy={startCheckout} />}
    </div>
  )
}

export default App
