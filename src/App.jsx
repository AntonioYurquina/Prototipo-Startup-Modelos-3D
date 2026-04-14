import { useMemo, useState } from 'react'
import {
  BarChart3,
  Box,
  Clock3,
  Eye,
  FileArchive,
  LayoutDashboard,
  Link2,
  ShoppingCart,
  Store,
  Upload,
  UserRound,
} from 'lucide-react'

const seedModels = [
  {
    id: 'mdl-001',
    nombrePublicado: 'Cafe Loft Interior Kit',
    formato: '.obj',
    zipName: 'cafe-loft-pack-v1.zip',
    filePath: '/simulado/storage/cafe-loft-pack-v1.zip',
    price: 49,
    images: [
      {
        id: 'img-001-1',
        modelId: 'mdl-001',
        url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'mdl-002',
    nombrePublicado: 'Drone Racer Concept',
    formato: '.stl',
    zipName: 'drone-racer-concept.zip',
    filePath: '/simulado/storage/drone-racer-concept.zip',
    price: 79,
    images: [
      {
        id: 'img-002-1',
        modelId: 'mdl-002',
        url: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'mdl-003',
    nombrePublicado: 'Urban Props Starter Pack',
    formato: '.fbx',
    zipName: 'urban-props-starter.zip',
    filePath: '/simulado/storage/urban-props-starter.zip',
    price: 39,
    images: [
      {
        id: 'img-003-1',
        modelId: 'mdl-003',
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
]

function App() {
  const [activeView, setActiveView] = useState('cliente')
  const [models, setModels] = useState(seedModels)
  const [clients, setClients] = useState([])
  const [sales, setSales] = useState([])
  const [checkout, setCheckout] = useState(null)
  const [generatedLinks, setGeneratedLinks] = useState([])
  const [dashboardFilter, setDashboardFilter] = useState('')
  const [viewCounters, setViewCounters] = useState(
    seedModels.reduce((acc, model) => {
      acc[model.id] = 0
      return acc
    }, {}),
  )

  const [checkoutCustomer, setCheckoutCustomer] = useState({
    nombre: '',
    email: '',
    telegram: '',
  })

  const [modelForm, setModelForm] = useState({
    nombrePublicado: '',
    formato: '.obj',
    zipName: '',
    filePath: '',
    price: '59',
    imagesRaw: '',
  })

  const [linkForm, setLinkForm] = useState({
    modelId: seedModels[0].id,
    cliente: '',
    expiresInHours: '24',
  })

  const buyClicks = sales.length
  const completedSales = sales.filter((sale) => sale.status === 'completed').length
  const conversionRate = buyClicks === 0 ? 0 : (completedSales / buyClicks) * 100

  const modelsWithStats = useMemo(
    () =>
      models
        .map((model) => {
          const views = viewCounters[model.id] || 0
          const clicks = sales.filter((sale) => sale.modelId === model.id).length
          return { ...model, views, clicks }
        })
        .sort((a, b) => b.views - a.views),
    [models, sales, viewCounters],
  )

  const filteredModels = useMemo(
    () =>
      modelsWithStats.filter((model) =>
        model.nombrePublicado.toLowerCase().includes(dashboardFilter.toLowerCase()),
      ),
    [dashboardFilter, modelsWithStats],
  )

  const trackModelView = (modelId) => {
    setViewCounters((prev) => ({ ...prev, [modelId]: (prev[modelId] || 0) + 1 }))
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
    setCheckout({ saleId, model })
    setCheckoutCustomer({ nombre: '', email: '', telegram: '' })
  }

  const completeCheckout = () => {
    if (!checkout) {
      return
    }

    const normalizedEmail = checkoutCustomer.email.trim().toLowerCase()
    let selectedClient = clients.find((client) => client.email === normalizedEmail)

    if (!selectedClient) {
      selectedClient = {
        id: `cli-${crypto.randomUUID()}`,
        nombre: checkoutCustomer.nombre || 'Cliente MVP',
        email: normalizedEmail || `cliente-${Date.now()}@demo.local`,
        telegram: checkoutCustomer.telegram || '@pendiente',
      }
      setClients((prev) => [selectedClient, ...prev])
    }

    setSales((prev) =>
      prev.map((sale) =>
        sale.id === checkout.saleId
          ? {
              ...sale,
              status: 'completed',
              clientId: selectedClient.id,
              fechaHoraCompra: new Date().toISOString(),
            }
          : sale,
      ),
    )

    setCheckout(null)
  }

  const submitModel = (event) => {
    event.preventDefault()

    const modelId = `mdl-${crypto.randomUUID()}`
    const imageUrls = modelForm.imagesRaw
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter(Boolean)

    const images =
      imageUrls.length > 0
        ? imageUrls.map((url, index) => ({
            id: `img-${modelId}-${index + 1}`,
            modelId,
            url,
          }))
        : [
            {
              id: `img-${modelId}-1`,
              modelId,
              url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=900&q=80',
            },
          ]

    const newModel = {
      id: modelId,
      nombrePublicado: modelForm.nombrePublicado,
      formato: modelForm.formato,
      zipName: modelForm.zipName,
      filePath: modelForm.filePath,
      price: Number(modelForm.price),
      images,
    }

    setModels((prev) => [newModel, ...prev])
    setViewCounters((prev) => ({ ...prev, [modelId]: 0 }))
    setModelForm({
      nombrePublicado: '',
      formato: '.obj',
      zipName: '',
      filePath: '',
      price: '59',
      imagesRaw: '',
    })
    setLinkForm((prev) => ({ ...prev, modelId }))
  }

  const generateTempLink = (event) => {
    event.preventDefault()
    const selectedModel = models.find((model) => model.id === linkForm.modelId)
    if (!selectedModel) {
      return
    }

    const expiresAt = new Date(Date.now() + Number(linkForm.expiresInHours) * 3600000)
    const token = crypto.randomUUID().replaceAll('-', '').slice(0, 16)
    const link = {
      id: `lnk-${crypto.randomUUID()}`,
      modelId: selectedModel.id,
      cliente: linkForm.cliente || 'cliente-mvp',
      url: `https://descargas.protomodelos.com/tmp/${token}?zip=${selectedModel.zipName}`,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    }

    setGeneratedLinks((prev) => [link, ...prev])
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-slate-200 bg-white p-5 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            MVP Lean Startup
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Mercado 3D
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Validacion de demanda y oferta con flujo simple de venta de modelos.
          </p>

          <nav className="mt-8 space-y-2">
            <button
              type="button"
              onClick={() => setActiveView('cliente')}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                activeView === 'cliente'
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Store size={18} />
              Vista Cliente
            </button>
            <button
              type="button"
              onClick={() => setActiveView('robledo')}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                activeView === 'robledo'
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard Robledo
            </button>
          </nav>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Resumen de validacion</p>
            <div className="mt-3 space-y-2">
              <p className="flex items-center justify-between">
                <span>Clics en comprar</span>
                <strong>{buyClicks}</strong>
              </p>
              <p className="flex items-center justify-between">
                <span>Ventas simuladas</span>
                <strong>{completedSales}</strong>
              </p>
              <p className="flex items-center justify-between">
                <span>Conversion</span>
                <strong>{conversionRate.toFixed(1)}%</strong>
              </p>
            </div>
          </div>
        </aside>

        <main className="p-4 md:p-8">
          {activeView === 'cliente' ? (
            <section className="space-y-6">
              {checkout ? (
                <article className="overflow-hidden rounded-2xl border border-yellow-300 bg-white shadow-xl shadow-yellow-200/60">
                  <div className="bg-yellow-300 px-6 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-900">
                      Checkout Seguro
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-yellow-950">
                      Simulacion Mercado Libre
                    </h2>
                  </div>

                  <div className="grid gap-6 p-6 md:grid-cols-[1fr_340px]">
                    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                      <p className="text-sm text-slate-500">
                        Estamos validando intencion de compra real. Completa los datos para confirmar la compra simulada.
                      </p>
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">Nombre</span>
                        <input
                          type="text"
                          value={checkoutCustomer.nombre}
                          onChange={(event) =>
                            setCheckoutCustomer((prev) => ({ ...prev, nombre: event.target.value }))
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
                        <input
                          type="email"
                          required
                          value={checkoutCustomer.email}
                          onChange={(event) =>
                            setCheckoutCustomer((prev) => ({ ...prev, email: event.target.value }))
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">Usuario de Telegram</span>
                        <input
                          type="text"
                          value={checkoutCustomer.telegram}
                          onChange={(event) =>
                            setCheckoutCustomer((prev) => ({ ...prev, telegram: event.target.value }))
                          }
                          placeholder="@usuario"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
                        />
                      </label>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="button"
                          onClick={completeCheckout}
                          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                          <ShoppingCart size={16} />
                          Confirmar compra simulada
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckout(null)}
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                        >
                          Volver al catalogo
                        </button>
                      </div>
                    </form>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <img
                        src={checkout.model.images[0].url}
                        alt={checkout.model.nombrePublicado}
                        className="h-36 w-full rounded-lg object-cover"
                      />
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">
                        {checkout.model.nombrePublicado}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">Formato {checkout.model.formato}</p>
                      <p className="mt-1 text-sm text-slate-500">ZIP {checkout.model.zipName}</p>
                      <p className="mt-4 text-2xl font-bold text-slate-900">USD {checkout.model.price}</p>
                    </div>
                  </div>
                </article>
              ) : (
                <>
                  <article className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl shadow-slate-900/30">
                    <div className="bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.5),_transparent_45%)] px-6 py-12 md:px-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300">
                        Marketplace de Modelos 3D
                      </p>
                      <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
                        Compra modelos 3D listos para produccion, hoy mismo.
                      </h2>
                      <p className="mt-4 max-w-2xl text-slate-300">
                        Explora assets curados en formatos .obj, .stl y .fbx. Checkout simulado para medir demanda real en segundos.
                      </p>
                    </div>
                  </article>

                  <article>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-slate-900">Catalogo</h3>
                      <p className="text-sm text-slate-500">{models.length} modelos disponibles</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {models.map((model) => (
                        <div
                          key={model.id}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <button
                            type="button"
                            onClick={() => trackModelView(model.id)}
                            className="block w-full"
                          >
                            <img
                              src={model.images[0].url}
                              alt={model.nombrePublicado}
                              className="h-44 w-full object-cover"
                            />
                          </button>
                          <div className="space-y-3 p-4">
                            <div>
                              <p className="text-lg font-semibold text-slate-900">{model.nombrePublicado}</p>
                              <p className="text-sm text-slate-500">Formato: {model.formato}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-slate-900">USD {model.price}</span>
                              <button
                                type="button"
                                onClick={() => startCheckout(model)}
                                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                              >
                                <ShoppingCart size={16} />
                                Comprar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </>
              )}
            </section>
          ) : (
            <section className="space-y-6">
              <header>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Dashboard Robledo</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Gestion interna de modelos, links temporales y metricas de validacion.
                </p>
              </header>

              <div className="grid gap-6 xl:grid-cols-2">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Box size={18} /> Gestion de Modelos
                  </h3>
                  <form className="mt-4 space-y-3" onSubmit={submitModel}>
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-slate-700">Nombre del Producto</span>
                      <input
                        type="text"
                        required
                        value={modelForm.nombrePublicado}
                        onChange={(event) =>
                          setModelForm((prev) => ({ ...prev, nombrePublicado: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      />
                    </label>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">Formato</span>
                        <select
                          value={modelForm.formato}
                          onChange={(event) =>
                            setModelForm((prev) => ({ ...prev, formato: event.target.value }))
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                        >
                          <option value=".obj">.obj</option>
                          <option value=".stl">.stl</option>
                          <option value=".fbx">.fbx</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">Precio (USD)</span>
                        <input
                          type="number"
                          min="1"
                          required
                          value={modelForm.price}
                          onChange={(event) =>
                            setModelForm((prev) => ({ ...prev, price: event.target.value }))
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Upload size={14} /> Path del archivo (simulado)
                      </span>
                      <input
                        type="text"
                        required
                        value={modelForm.filePath}
                        onChange={(event) =>
                          setModelForm((prev) => ({ ...prev, filePath: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <FileArchive size={14} /> ZipName
                      </span>
                      <input
                        type="text"
                        required
                        value={modelForm.zipName}
                        onChange={(event) => setModelForm((prev) => ({ ...prev, zipName: event.target.value }))}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-slate-700">
                        URLs de imagen (separadas por coma o nueva linea)
                      </span>
                      <textarea
                        rows="3"
                        value={modelForm.imagesRaw}
                        onChange={(event) =>
                          setModelForm((prev) => ({ ...prev, imagesRaw: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      />
                    </label>
                    <button
                      type="submit"
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Guardar modelo
                    </button>
                  </form>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Link2 size={18} /> Generador de Links
                  </h3>
                  <form className="mt-4 space-y-3" onSubmit={generateTempLink}>
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-slate-700">Modelo</span>
                      <select
                        value={linkForm.modelId}
                        onChange={(event) => setLinkForm((prev) => ({ ...prev, modelId: event.target.value }))}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      >
                        {models.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.nombrePublicado}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <UserRound size={14} /> Cliente
                      </span>
                      <input
                        type="text"
                        value={linkForm.cliente}
                        onChange={(event) => setLinkForm((prev) => ({ ...prev, cliente: event.target.value }))}
                        placeholder="@cliente_telegram"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock3 size={14} /> Expiracion en horas
                      </span>
                      <input
                        type="number"
                        min="1"
                        required
                        value={linkForm.expiresInHours}
                        onChange={(event) =>
                          setLinkForm((prev) => ({ ...prev, expiresInHours: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      />
                    </label>
                    <button
                      type="submit"
                      className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      Generar link temporal
                    </button>
                  </form>

                  <div className="mt-4 space-y-2">
                    {generatedLinks.slice(0, 3).map((link) => (
                      <div key={link.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                        <p className="truncate font-medium text-slate-700">{link.url}</p>
                        <p className="mt-1 text-slate-500">Cliente: {link.cliente}</p>
                        <p className="text-slate-500">Vence: {new Date(link.expiresAt).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <BarChart3 size={18} /> Metricas de Validacion
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Clics en Comprar</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">{buyClicks}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Modelos mas vistos</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">{modelsWithStats[0]?.views || 0}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Tasa de conversion</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">{conversionRate.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <label className="w-full max-w-sm">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Filtrar modelos
                    </span>
                    <input
                      type="text"
                      value={dashboardFilter}
                      onChange={(event) => setDashboardFilter(event.target.value)}
                      placeholder="Buscar por nombre"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                    />
                  </label>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      <tr>
                        <th className="px-3 py-2">Modelo</th>
                        <th className="px-3 py-2">Formato</th>
                        <th className="px-3 py-2">Vistas</th>
                        <th className="px-3 py-2">Clicks compra</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModels.map((model) => (
                        <tr key={model.id} className="border-t border-slate-200">
                          <td className="px-3 py-2 font-medium text-slate-800">{model.nombrePublicado}</td>
                          <td className="px-3 py-2 text-slate-600">{model.formato}</td>
                          <td className="px-3 py-2 text-slate-600">{model.views}</td>
                          <td className="px-3 py-2 text-slate-600">{model.clicks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Eye size={18} /> Flujo Venta de Modelo
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      <tr>
                        <th className="px-3 py-2">Fecha y hora de compra</th>
                        <th className="px-3 py-2">Modelo</th>
                        <th className="px-3 py-2">Cliente</th>
                        <th className="px-3 py-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.slice(0, 8).map((sale) => {
                        const model = models.find((item) => item.id === sale.modelId)
                        const client = clients.find((item) => item.id === sale.clientId)
                        return (
                          <tr key={sale.id} className="border-t border-slate-200">
                            <td className="px-3 py-2 text-slate-600">
                              {new Date(sale.fechaHoraCompra).toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-slate-800">{model?.nombrePublicado || 'N/D'}</td>
                            <td className="px-3 py-2 text-slate-600">
                              {client ? `${client.nombre} (${client.telegram})` : 'Por completar'}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                  sale.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}
                              >
                                {sale.status === 'completed' ? 'Completada' : 'Intento iniciado'}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </article>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
