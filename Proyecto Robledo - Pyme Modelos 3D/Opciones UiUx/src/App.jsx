import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [models, setModels] = useState([])
  const [uploadMessage, setUploadMessage] = useState('')
  const [copyMessage, setCopyMessage] = useState('')
  const [messageType, setMessageType] = useState('info') // 'success', 'error', 'info'
  const [activeModelId, setActiveModelId] = useState(null)
  const [showGenericModel, setShowGenericModel] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeView, setActiveView] = useState('upload')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalModelId, setModalModelId] = useState(null)
  const [visibleCount, setVisibleCount] = useState(10)
  const [pendingUploads, setPendingUploads] = useState([])
  const [sales, setSales] = useState([])
  const [saleRows, setSaleRows] = useState([
    {
      id: Date.now(),
      customerName: '',
      modelId: '',
      warning: null
    }
  ])
  const [salesMessage, setSalesMessage] = useState('')
  const [salesMessageType, setSalesMessageType] = useState('info')
  const [visibleSalesCount, setVisibleSalesCount] = useState(10)

  const genericModelUrl = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
  const activeModel = models.find((entry) => entry.id === activeModelId) || null
  
  // Contenido simulado para demostración
  const demoModels = [
    {
      id: 1,
      name: 'Sillón Moderno',
      description: 'Sillón de diseño low-poly para e-commerce',
      path: '/assets/models/sillon-moderno.glb',
      fileName: 'sillon-moderno.glb',
      zipName: 'sillon-moderno.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/1-sillon-moderno'
    },
    {
      id: 2,
      name: 'Mesa Minimalista',
      description: 'Mesa redonda estilo nórdico',
      path: '/assets/models/mesa-minimalista.obj',
      fileName: 'mesa-minimalista.obj',
      zipName: 'mesa-minimalista.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 3,
      name: 'Lámpara Diseño',
      description: 'Lámpara de piso moderna',
      path: '/assets/models/lampara-diseno.gltf',
      fileName: 'lampara-diseno.gltf',
      zipName: 'lampara-diseno.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 4,
      name: 'Silla Ergonómica',
      description: 'Silla de oficina con respaldo ajustable',
      path: '/assets/models/silla-ergonomica.glb',
      fileName: 'silla-ergonomica.glb',
      zipName: 'silla-ergonomica.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/4-silla-ergonomica'
    },
    {
      id: 5,
      name: 'Escritorio Ejecutivo',
      description: 'Escritorio de madera para ejecutivos',
      path: '/assets/models/escritorio-ejecutivo.obj',
      fileName: 'escritorio-ejecutivo.obj',
      zipName: 'escritorio-ejecutivo.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 6,
      name: 'Estantería Modular',
      description: 'Sistema de estantería personalizable',
      path: '/assets/models/estanteria-modular.gltf',
      fileName: 'estanteria-modular.gltf',
      zipName: 'estanteria-modular.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/6-estanteria-modular'
    },
    {
      id: 7,
      name: 'Cama King Size',
      description: 'Cama matrimonial con cabecero tallado',
      path: '/assets/models/cama-king-size.glb',
      fileName: 'cama-king-size.glb',
      zipName: 'cama-king-size.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 8,
      name: 'Moto Vintage',
      description: 'Motocicleta clásica restaurada',
      path: '/assets/models/moto-vintage.obj',
      fileName: 'moto-vintage.obj',
      zipName: 'moto-vintage.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 9,
      name: 'Sofá Modular',
      description: 'Mueble para interior minimalista',
      path: '/assets/models/sofa-modular.gltf',
      fileName: 'sofa-modular.gltf',
      zipName: 'sofa-modular.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/9-sofa-modular'
    },
    {
      id: 10,
      name: 'Reloj de Pared',
      description: 'Reloj con detalles metálicos',
      path: '/assets/models/reloj-pared.glb',
      fileName: 'reloj-pared.glb',
      zipName: 'reloj-pared.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 11,
      name: 'Parque Infantil',
      description: 'Juego de parque para simulaciones urbanas',
      path: '/assets/models/parque-infantil.glb',
      fileName: 'parque-infantil.glb',
      zipName: 'parque-infantil.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/11-parque-infantil'
    },
    {
      id: 12,
      name: 'Laptop Ultra',
      description: 'Laptop premium para prototipos',
      path: '/assets/models/laptop-ultra.gltf',
      fileName: 'laptop-ultra.gltf',
      zipName: 'laptop-ultra.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 13,
      name: 'Cafetera Italiana',
      description: 'Cafetera clásica estilo italiano',
      path: '/assets/models/cafetera-italiana.glb',
      fileName: 'cafetera-italiana.glb',
      zipName: 'cafetera-italiana.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/13-cafetera-italiana'
    },
    {
      id: 14,
      name: 'Bicicleta Urbana',
      description: 'Bicicleta plegable para ciudad',
      path: '/assets/models/bicicleta-urbana.obj',
      fileName: 'bicicleta-urbana.obj',
      zipName: 'bicicleta-urbana.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 15,
      name: 'Aspiradora Robot',
      description: 'Robot aspirador inteligente',
      path: '/assets/models/aspiradora-robot.gltf',
      fileName: 'aspiradora-robot.gltf',
      zipName: 'aspiradora-robot.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/15-aspiradora-robot'
    },
    {
      id: 16,
      name: 'Guitarra Eléctrica',
      description: 'Guitarra eléctrica vintage',
      path: '/assets/models/guitarra-electrica.glb',
      fileName: 'guitarra-electrica.glb',
      zipName: 'guitarra-electrica.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 17,
      name: 'Microondas Digital',
      description: 'Microondas con pantalla táctil',
      path: '/assets/models/microondas-digital.obj',
      fileName: 'microondas-digital.obj',
      zipName: 'microondas-digital.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/17-microondas-digital'
    },
    {
      id: 18,
      name: 'Telescopio Astronómico',
      description: 'Telescopio reflector para aficionados',
      path: '/assets/models/telescopio-astronomico.gltf',
      fileName: 'telescopio-astronomico.gltf',
      zipName: 'telescopio-astronomico.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 19,
      name: 'Impresora 3D',
      description: 'Impresora 3D de escritorio profesional',
      path: '/assets/models/impresora-3d.glb',
      fileName: 'impresora-3d.glb',
      zipName: 'impresora-3d.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/19-impresora-3d'
    },
    {
      id: 20,
      name: 'Cámara DSLR',
      description: 'Cámara fotográfica profesional',
      path: '/assets/models/camara-dslr.obj',
      fileName: 'camara-dslr.obj',
      zipName: 'camara-dslr.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 21,
      name: 'Ventilador Industrial',
      description: 'Ventilador de techo para espacios grandes',
      path: '/assets/models/ventilador-industrial.gltf',
      fileName: 'ventilador-industrial.gltf',
      zipName: 'ventilador-industrial.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/21-ventilador-industrial'
    },
    {
      id: 22,
      name: 'Proyector HD',
      description: 'Proyector multimedia de alta definición',
      path: '/assets/models/proyector-hd.glb',
      fileName: 'proyector-hd.glb',
      zipName: 'proyector-hd.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 23,
      name: 'Altavoz Bluetooth',
      description: 'Altavoz inalámbrico con sonido 360°',
      path: '/assets/models/altavoz-bluetooth.obj',
      fileName: 'altavoz-bluetooth.obj',
      zipName: 'altavoz-bluetooth.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/23-altavoz-bluetooth'
    },
    {
      id: 24,
      name: 'Refrigerador Smart',
      description: 'Refrigerador inteligente con IoT',
      path: '/assets/models/refrigerador-smart.gltf',
      fileName: 'refrigerador-smart.gltf',
      zipName: 'refrigerador-smart.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 25,
      name: 'Dron Profesional',
      description: 'Dron con cámara 4K para fotografía aérea',
      path: '/assets/models/dron-profesional.glb',
      fileName: 'dron-profesional.glb',
      zipName: 'dron-profesional.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/25-dron-profesional'
    },
    {
      id: 26,
      name: 'Lavadora Frontal',
      description: 'Lavadora de carga frontal eficiente',
      path: '/assets/models/lavadora-frontal.obj',
      fileName: 'lavadora-frontal.obj',
      zipName: 'lavadora-frontal.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 27,
      name: 'Consola de Videojuegos',
      description: 'Consola de última generación',
      path: '/assets/models/consola-videojuegos.gltf',
      fileName: 'consola-videojuegos.gltf',
      zipName: 'consola-videojuegos.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/27-consola-videojuegos'
    },
    {
      id: 28,
      name: 'Aire Acondicionado',
      description: 'Sistema de climatización split',
      path: '/assets/models/aire-acondicionado.glb',
      fileName: 'aire-acondicionado.glb',
      zipName: 'aire-acondicionado.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 29,
      name: 'Plancha de Vapor',
      description: 'Plancha con sistema de vapor profesional',
      path: '/assets/models/plancha-vapor.obj',
      fileName: 'plancha-vapor.obj',
      zipName: 'plancha-vapor.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/29-plancha-vapor'
    },
    {
      id: 30,
      name: 'Báscula Digital',
      description: 'Báscula inteligente con conectividad',
      path: '/assets/models/bascuala-digital.gltf',
      fileName: 'bascuala-digital.gltf',
      zipName: 'bascuala-digital.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 31,
      name: 'Router WiFi',
      description: 'Router mesh de alta velocidad',
      path: '/assets/models/router-wifi.glb',
      fileName: 'router-wifi.glb',
      zipName: 'router-wifi.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/31-router-wifi'
    },
    {
      id: 32,
      name: 'Taladro Inalámbrico',
      description: 'Taladro a batería profesional',
      path: '/assets/models/taladro-inalambrico.obj',
      fileName: 'taladro-inalambrico.obj',
      zipName: 'taladro-inalambrico.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 33,
      name: 'Monitor Gaming',
      description: 'Monitor curvo 144Hz para gaming',
      path: '/assets/models/monitor-gaming.gltf',
      fileName: 'monitor-gaming.gltf',
      zipName: 'monitor-gaming.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/33-monitor-gaming'
    },
    {
      id: 34,
      name: 'Horno Eléctrico',
      description: 'Horno empotrable multifunción',
      path: '/assets/models/horno-electrico.glb',
      fileName: 'horno-electrico.glb',
      zipName: 'horno-electrico.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 35,
      name: 'Teclado Mecánico',
      description: 'Teclado gaming con switches mecánicos',
      path: '/assets/models/teclado-mecanico.obj',
      fileName: 'teclado-mecanico.obj',
      zipName: 'teclado-mecanico.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/35-teclado-mecanico'
    },
    {
      id: 36,
      name: 'Licuadora Profesional',
      description: 'Licuadora de alta potencia para cocina',
      path: '/assets/models/licuadora-profesional.gltf',
      fileName: 'licuadora-profesional.gltf',
      zipName: 'licuadora-profesional.zip',
      status: 'guardado',
      link: null
    },
    {
      id: 37,
      name: 'Smartwatch Deportivo',
      description: 'Reloj inteligente para actividades físicas',
      path: '/assets/models/smartwatch-deportivo.glb',
      fileName: 'smartwatch-deportivo.glb',
      zipName: 'smartwatch-deportivo.zip',
      status: 'link generado',
      link: 'https://modelo.robledo.com/37-smartwatch-deportivo'
    }
  ]

  const displayModels = models.length > 0 ? models : demoModels
  const isSearching = searchTerm.trim() !== ''

  const filteredModels = isSearching
    ? displayModels.filter((model) => String(model.id).includes(searchTerm.trim()))
    : displayModels

  const paginatedModels = filteredModels.slice(0, visibleCount)
  const hasMoreModels = filteredModels.length > visibleCount

  const stats = {
    total: models.length,
    withLink: models.filter((m) => m.link).length,
    noLink: models.filter((m) => !m.link).length
  }

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [isDarkMode])

  useEffect(() => {
    setVisibleCount(10)
  }, [searchTerm])

  useEffect(() => {
    if (activeView === 'upload' && pendingUploads.length === 0) {
      const newId = Date.now()
      const newPending = {
        id: newId,
        path: `/uploads/model-${newId}.glb`,
        zipName: `model-${newId}.zip`,
        name: '',
        file: null
      }
      setPendingUploads([newPending])
    }
  }, [activeView, pendingUploads.length])

  const generateModelUrl = (entry) => {
    const slug = entry.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    return `${window.location.origin}/modelo/${entry.id}-${slug}`
  }

  const handleGenerateLink = (modelId) => {
    setModels((prev) =>
      prev.map((entry) => {
        if (entry.id !== modelId) return entry
        const updated = {
          ...entry,
          link: generateModelUrl(entry),
          status: 'link generado'
        }
        setActiveModelId(modelId)
        return updated
      })
    )
    setUploadMessage('Enlace generado correctamente.')
    setMessageType('success')
    setCopyMessage('')
  }

  const handleAddPendingUpload = () => {
    const newId = Date.now()
    const newPending = {
      id: newId,
      path: `/uploads/model-${newId}.glb`,
      zipName: `model-${newId}.zip`,
      name: '',
      file: null
    }
    setPendingUploads(prev => [...prev, newPending])
  }

  const handleUpdatePendingUpload = (id, field, value) => {
    setPendingUploads(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const handleUploadAllPending = () => {
    const validUploads = pendingUploads.filter(item => item.name.trim() !== '' && item.file)
    
    if (validUploads.length === 0) {
      setUploadMessage('No hay modelos válidos para cargar. Asegúrate de que todos tengan nombre y archivo.')
      setMessageType('error')
      return
    }

    // Simular carga
    const newModels = validUploads.map(item => ({
      id: item.id,
      name: item.name,
      path: item.path,
      zipName: item.zipName,
      status: 'guardado',
      link: null
    }))

    setModels(prev => [...prev, ...newModels])
    setPendingUploads([])
    setUploadMessage(`${validUploads.length} modelo(s) cargado(s) correctamente.`)
    setMessageType('success')
  }

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopyMessage('Link copiado al portapapeles.')
      setMessageType('success')
      setTimeout(() => setCopyMessage(''), 2200)
    })
  }

  const handleSaleRowChange = (rowId, field, value) => {
    setSaleRows(prev =>
      prev.map(row => {
        if (row.id !== rowId) return row
        const updated = { ...row, [field]: value, warning: null }
        
        if (field === 'customerName' && value.trim()) {
          const isDuplicate = sales.some(
            sale => sale.customerName.toLowerCase() === value.trim().toLowerCase()
          )
          if (isDuplicate) {
            updated.warning = 'Cliente ya existe'
          }
        }
        
        return updated
      })
    )
  }

  const handleAddSaleRow = () => {
    setSaleRows(prev => [
      ...prev,
      {
        id: Date.now(),
        customerName: '',
        modelId: '',
        warning: null
      }
    ])
  }

  const handleDeleteSaleRow = (rowId) => {
    if (saleRows.length > 1) {
      setSaleRows(prev => prev.filter(row => row.id !== rowId))
    }
  }

  const handleRegisterAllSales = () => {
    const validRows = saleRows.filter(row => row.customerName.trim() && row.modelId.trim())
    
    if (validRows.length === 0) {
      setSalesMessage('Por favor complete al menos una venta.')
      setSalesMessageType('alert')
      return
    }

    const invalidModelIds = validRows.filter(row => {
      const modelId = parseInt(row.modelId.trim())
      return !displayModels.some(model => model.id === modelId)
    })

    if (invalidModelIds.length > 0) {
      setSalesMessage('Algunos IDs de modelo no existen.')
      setSalesMessageType('alert')
      return
    }

    const newSales = validRows.map((row, index) => ({
      id: Date.now() + index,
      customerId: `CUS-${Date.now()}-${index}`,
      customerName: row.customerName.trim(),
      modelId: parseInt(row.modelId.trim()),
      saleDate: new Date().toISOString(),
      modelName: displayModels.find(m => m.id === parseInt(row.modelId.trim()))?.name || 'Modelo desconocido'
    }))

    setSales(prev => [...prev, ...newSales])
    setSaleRows([
      {
        id: Date.now() + 1000,
        customerName: '',
        modelId: '',
        warning: null
      }
    ])
    setSalesMessage(`${validRows.length} venta(s) registrada(s) correctamente.`)
    setSalesMessageType('success')
    setTimeout(() => setSalesMessage(''), 3500)
  }

  const getAvailableModelIds = () => {
    return displayModels.map(model => model.id.toString())
  }

  const getModelNameById = (modelId) => {
    if (!modelId.trim()) return null
    const id = parseInt(modelId.trim())
    const model = displayModels.find(m => m.id === id)
    return model ? model.name : null
  }

  const getSalesByDate = () => {
    const salesByDate = {}
    sales.forEach(sale => {
      const dateStr = new Date(sale.saleDate).toLocaleDateString('es-ES')
      if (!salesByDate[dateStr]) {
        salesByDate[dateStr] = 0
      }
      salesByDate[dateStr]++
    })
    return Object.entries(salesByDate).sort((a, b) => new Date(a[0]) - new Date(b[0]))
  }

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [isDarkMode])

  useEffect(() => {
    setVisibleCount(10)
  }, [searchTerm])

  useEffect(() => {
    if (activeView === 'upload' && pendingUploads.length === 0) {
      const newId = Date.now()
      const newPending = {
        id: newId,
        path: `/uploads/model-${newId}.glb`,
        zipName: `model-${newId}.zip`,
        name: '',
        file: null
      }
      setPendingUploads([newPending])
    }
  }, [activeView, pendingUploads.length])

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h3>Robledo - Pyme Modelos 3D</h3>
        </div>

        <ul className="nav-items">
          <li>
            <button
              className={`nav-btn ${activeView === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveView('upload')}
            >
              Subir Modelo
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activeView === 'search' ? 'active' : ''}`}
              onClick={() => setActiveView('search')}
            >
              Buscar & Links
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activeView === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveView('sales')}
            >
              Registrar Venta
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activeView === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveView('summary')}
              style={{ marginLeft: 'auto' }}
            >
              📊 Resumen
            </button>
          </li>
        </ul>

        <div className="theme-toggle">
          <button
            className="toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <main className="app-container">
        <header className="app-header">
          <p>
            {activeView === 'upload' && 'Carga múltiples modelos 3D'}
            {activeView === 'search' && 'Busca y genera links para tus modelos'}
            {activeView === 'sales' && 'Registra ventas de modelos 3D'}
            {activeView === 'summary' && 'Métricas del negocio y resumen de actividades'}
            {activeView === 'explore' && 'Explora tus modelos cargados'}
          </p>
        </header>

        {/* VIEW: UPLOAD */}
        {activeView === 'upload' && (
          <section className="view-content view-upload">
            <div className="card large">
              <h2>Nota: Cargar Modelos 3D</h2>
              <div style={{ marginBottom: '20px' }}>
                <button
                  className="primary"
                  onClick={handleAddPendingUpload}
                >
                  Agregar otro registro
                </button>
                {pendingUploads.length > 0 && (
                  <button
                    className="primary"
                    onClick={handleUploadAllPending}
                    style={{ marginLeft: '10px' }}
                  >
                    Cargar todos
                  </button>
                )}
              </div>
              {pendingUploads.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>
                  Haz clic en "Agregar otro registro" para empezar a cargar modelos.
                </p>
              ) : (
                <table className="models-table upload-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Path</th>
                      <th>ZipName</th>
                      <th>Nombre</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUploads.map((item) => (
                      <tr key={item.id} className="model-row">
                        <td>{item.id}</td>
                        <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{item.path}</td>
                        <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{item.zipName}</td>
                        <td>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdatePendingUpload(item.id, 'name', e.target.value)}
                            placeholder="Ingresa nombre del modelo"
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid var(--border)',
                              borderRadius: '6px',
                              background: 'var(--accent-bg)',
                              color: 'var(--text)',
                              fontSize: '13px'
                            }}
                          />
                        </td>
                        <td>
                          <div className="table-actions">
                            <input
                              type="file"
                              accept=".obj,.gltf,.glb,.zip"
                              onChange={(e) => handleUpdatePendingUpload(item.id, 'file', e.target.files?.[0] || null)}
                              style={{
                                fontSize: '12px',
                                padding: '4px',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                background: 'var(--accent-bg)',
                                color: 'var(--text)'
                              }}
                            />
                            {item.file && (
                              <button
                                className="action-btn action-view"
                                onClick={() => {
                                  setModalModelId(item.id)
                                  setShowModal(true)
                                }}
                                title="Ver modelo"
                              >
                                👁️
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {uploadMessage && <p className={`message message-${messageType}`}>{uploadMessage}</p>}
            </div>

            <section className="stats-card">
              <h3>Resumen</h3>
              <div className="stats-grid">
                <div>{models.length || 12}<small>Modelos cargados</small></div>
                <div>{models.filter((m) => m.link).length || 6}<small>Links generados</small></div>
                <div>{models.filter((m) => !m.link).length || 6}<small>Pendiente generar link</small></div>
              </div>
            </section>
          </section>
        )}

        {/* VIEW: SEARCH & LINKS */}
        {activeView === 'search' && (
          <section className="view-content view-search">
            <div className="card large">
              <h2>Nota: Buscar Modelos y Generar Links</h2>
              <label className="search-label">
                Buscar por ID
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ingresa el ID del modelo (1, 2, 3...)..."
                  className="search-input"
                />
              </label>
              <table className="models-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Path</th>
                    <th>Nombre del zip</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                        {isSearching
                          ? `No se encontró modelo con ID "${searchTerm}".`
                          : 'No hay modelos cargados aún. Ve a "Subir Modelo" para empezar.'}
                      </td>
                    </tr>
                  ) : (
                    paginatedModels.map((entry) => (
                      <tr key={entry.id} className="model-row">
                        <td>{entry.id}</td>
                        <td>
                          <strong>{entry.name}</strong>
                          <span>{entry.description || 'Sin descripción'}</span>
                        </td>
                        <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{entry.path || '/assets/models/...'}</td>
                        <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{entry.zipName || 'sin-zip.zip'}</td>
                        <td>
                          <span className={`status-badge status-${entry.status.toLowerCase()}`}>{entry.status}</span>
                        </td>
                        <td>
                          <div className="table-actions table-actions-vertical">
                            <button
                              className="action-btn action-view"
                              onClick={() => {
                                setModalModelId(entry.id)
                                setShowModal(true)
                              }}
                              title="Visualizar modelo"
                            >
                              👁️
                            </button>
                            {!entry.link && (
                              <button
                                className="action-btn action-generate"
                                onClick={() => handleGenerateLink(entry.id)}
                                title="Generar link"
                              >
                                🔗
                              </button>
                            )}
                            {entry.link && (
                              <button
                                className="action-btn action-copy"
                                onClick={() => handleCopy(entry.link)}
                                title="Copiar link"
                              >
                                📋
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {hasMoreModels && (
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <button
                    className="primary"
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                  >
                    Ver más modelos
                  </button>
                </div>
              )}
              {copyMessage && <p className={`message message-${messageType}`}>{copyMessage}</p>}
            </div>
          </section>
        )}

        {/* VIEW: SALES */}
        {activeView === 'sales' && (
          <section className="view-content view-sales">
            <div className="card large">
              <h2>Registrar Ventas</h2>
              
              {salesMessage && (
                <p className={`message message-${salesMessageType} message-${salesMessageType}-pastel`}>
                  {salesMessage}
                </p>
              )}

              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: 'var(--muted)', fontSize: '13px', fontStyle: 'italic' }}>
                  💡 Completa la información de los clientes y los modelos que compraron, luego haz clic en "Registrar Todas las Ventas"
                </p>
              </div>

              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table className="models-table" style={{ minWidth: '800px' }}>
                  <thead>
                    <tr>
                      <th>Nombre del Cliente</th>
                      <th>ID del Modelo</th>
                      <th>Nombre del Modelo</th>
                      <th>Actividad</th>
                      {saleRows.length > 1 && <th style={{ width: '80px', textAlign: 'center' }}>Eliminar</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {saleRows.map((row) => {
                      const modelName = getModelNameById(row.modelId)
                      return (
                        <tr key={row.id} style={{ position: 'relative' }}>
                          <td>
                            <input
                              type="text"
                              value={row.customerName}
                              onChange={(e) => handleSaleRowChange(row.id, 'customerName', e.target.value)}
                              placeholder="Nombre completo del cliente"
                              style={{
                                width: '100%',
                                padding: '10px',
                                border: row.warning ? '2px solid #ff6c6c' : '1px solid var(--border)',
                                borderRadius: '6px',
                                background: 'var(--accent-bg)',
                                color: 'var(--text)',
                                fontSize: '13px',
                                boxSizing: 'border-box'
                              }}
                            />
                            {row.warning && (
                              <small style={{ color: '#ff6c6c', display: 'block', marginTop: '4px' }}>
                                ⚠️ {row.warning}
                              </small>
                            )}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={row.modelId}
                              onChange={(e) => handleSaleRowChange(row.id, 'modelId', e.target.value)}
                              placeholder="ID del modelo"
                              list="modelIds"
                              style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid var(--border)',
                                borderRadius: '6px',
                                background: 'var(--accent-bg)',
                                color: 'var(--text)',
                                fontSize: '13px',
                                boxSizing: 'border-box'
                              }}
                            />
                            <datalist id="modelIds">
                              {getAvailableModelIds().map(id => (
                                <option key={id} value={id} />
                              ))}
                            </datalist>
                          </td>
                          <td>
                            {modelName ? (
                              <span style={{ fontSize: '13px', color: 'var(--text)' }}>{modelName}</span>
                            ) : (
                              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>-</span>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {modelName && (
                              <button
                                onClick={() => {
                                  setModalModelId(parseInt(row.modelId.trim()))
                                  setShowModal(true)
                                }}
                                style={{
                                  background: 'transparent',
                                  border: '1px solid var(--primary)',
                                  color: 'var(--primary)',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background = 'var(--primary)'
                                  e.target.style.color = 'white'
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background = 'transparent'
                                  e.target.style.color = 'var(--primary)'
                                }}
                              >
                                👁️ Ver Modelo
                              </button>
                            )}
                          </td>
                          {saleRows.length > 1 && (
                            <td style={{ textAlign: 'center' }}>
                              <button
                                onClick={() => handleDeleteSaleRow(row.id)}
                                style={{
                                  background: 'transparent',
                                  border: '1px solid var(--danger)',
                                  color: 'var(--danger)',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background = 'var(--danger)'
                                  e.target.style.color = 'white'
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background = 'transparent'
                                  e.target.style.color = 'var(--danger)'
                                }}
                                title="Eliminar esta fila"
                              >
                                ✕
                              </button>
                            </td>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <button
                  className="primary"
                  onClick={handleAddSaleRow}
                >
                  + Agregar otra fila
                </button>
                {saleRows.length > 0 && (
                  <button
                    className="primary"
                    onClick={handleRegisterAllSales}
                    style={{ marginLeft: '10px' }}
                  >
                    ✓ Registrar Todas las Ventas
                  </button>
                )}
              </div>

              {sales.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: '20px', marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                    Historial de Ventas Registradas ({sales.length})
                  </h3>
                  <table className="models-table">
                    <thead>
                      <tr>
                        <th>ID Cliente</th>
                        <th>Cliente</th>
                        <th>ID Modelo</th>
                        <th>Modelo</th>
                        <th>Fecha de Venta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.slice(0, visibleSalesCount).map((sale) => (
                        <tr key={sale.id}>
                          <td style={{ fontWeight: 'bold', fontSize: '12px' }}>{sale.customerId}</td>
                          <td>{sale.customerName}</td>
                          <td>{sale.modelId}</td>
                          <td>{sale.modelName}</td>
                          <td style={{ fontSize: '12px', color: 'var(--muted)' }}>
                            {new Date(sale.saleDate).toLocaleDateString()} {new Date(sale.saleDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {sales.length > visibleSalesCount && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button
                        className="primary"
                        onClick={() => setVisibleSalesCount(prev => prev + 10)}
                        style={{ padding: '10px 24px' }}
                      >
                        Ver más ventas ({sales.length - visibleSalesCount} restantes)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* VIEW: SUMMARY */}
        {activeView === 'summary' && (
          <section className="view-content view-summary">
            <div className="card large">
              <h2>📊 Resumen del Negocio</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {/* UPLOAD SECTION */}
                <div style={{ padding: '20px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(77, 140, 251, 0.1) 0%, rgba(45, 99, 235, 0.05) 100%)', border: '2px solid #4d8cfb' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#4d8cfb', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    📤 Modelos Cargados
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>
                    {models.length}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {models.filter(m => m.link).length} con links generados
                  </div>
                </div>

                {/* SALES SECTION */}
                <div style={{ padding: '20px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)', border: '2px solid #f97316' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#f97316', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    💰 Ventas Registradas
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>
                    {sales.length}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {sales.length > 0 ? 'Últimas transacciones registradas' : 'Sin ventas aún'}
                  </div>
                </div>
              </div>

              {/* DETAILED METRICS */}
              <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '2px solid var(--border)' }}>
                <h3 style={{ marginBottom: '20px' }}>📈 Métricas Detalladas</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'var(--accent-bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '600' }}>Modelos Pendientes</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)' }}>
                      {models.filter(m => !m.link).length}
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'var(--accent-bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '600' }}>Pendientes en Upload</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)' }}>
                      {pendingUploads.length}
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'var(--accent-bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '600' }}>Pendientes en Ventas</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)' }}>
                      {saleRows.filter(row => row.customerName.trim() || row.modelId.trim()).length}
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'var(--accent-bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '600' }}>Modelos Disponibles</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)' }}>
                      {displayModels.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '2px solid var(--border)' }}>
                <h3 style={{ marginBottom: '20px' }}>🎯 Progreso General</h3>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                    <span>Carga de Modelos</span>
                    <span style={{ fontWeight: '700', color: '#4d8cfb' }}>{models.length}/{displayModels.length}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--accent-bg)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${(models.length / displayModels.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #4d8cfb 0%, #2563eb 100%)', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                    <span>Actividad de Ventas</span>
                    <span style={{ fontWeight: '700', color: '#f97316' }}>{sales.length} ventas</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--accent-bg)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min((sales.length / 10) * 100, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>
              </div>

              {/* SALES BY DATE CHART */}
              {sales.length > 0 && (
                <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '2px solid var(--border)' }}>
                  <h3 style={{ marginBottom: '20px' }}>📈 Ventas por Fecha</h3>
                  
                  <div style={{ padding: '20px', background: 'var(--accent-bg)', borderRadius: '12px', border: '1px solid var(--border)', overflowX: 'auto' }}>
                    <svg viewBox="0 0 800 300" style={{ width: '100%', minHeight: '300px', display: 'block' }}>
                      {(() => {
                        const salesByDate = getSalesByDate()
                        if (salesByDate.length === 0) return null
                        
                        const maxSales = Math.max(...salesByDate.map(([_, count]) => count))
                        const barWidth = Math.max(30, 700 / salesByDate.length)
                        const chartHeight = 200
                        const padding = 40
                        
                        return (
                          <>
                            {/* Y Axis */}
                            <line x1={padding} y1={padding} x2={padding} y2={padding + chartHeight} stroke="var(--border)" strokeWidth="2" />
                            
                            {/* X Axis */}
                            <line x1={padding} y1={padding + chartHeight} x2={padding + barWidth * salesByDate.length + 20} y2={padding + chartHeight} stroke="var(--border)" strokeWidth="2" />
                            
                            {/* Y Axis Labels */}
                            {[...Array(5)].map((_, i) => {
                              const value = Math.ceil((maxSales / 4) * i)
                              const yPos = padding + chartHeight - (chartHeight / 4) * i
                              return (
                                <g key={`y-${i}`}>
                                  <text x={padding - 10} y={yPos + 4} textAnchor="end" fontSize="12" fill="var(--muted)">{value}</text>
                                  <line x1={padding - 5} y1={yPos} x2={padding} y2={yPos} stroke="var(--border)" strokeWidth="1" />
                                </g>
                              )
                            })}
                            
                            {/* Bars and Labels */}
                            {salesByDate.map(([date, count], idx) => {
                              const barHeight = (count / maxSales) * chartHeight
                              const xPos = padding + (idx * barWidth) + (barWidth - 30) / 2
                              const yPos = padding + chartHeight - barHeight
                              
                              return (
                                <g key={`bar-${idx}`}>
                                  <rect x={xPos} y={yPos} width="30" height={barHeight} fill="#f97316" rx="4" opacity="0.8" />
                                  <text x={xPos + 15} y={padding + chartHeight + 20} textAnchor="middle" fontSize="11" fill="var(--text)" style={{ wordBreak: 'break-all' }}>{date.substring(0, 5)}</text>
                                  <text x={xPos + 15} y={yPos - 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#f97316">{count}</text>
                                </g>
                              )
                            })}
                          </>
                        )
                      })()}
                    </svg>
                  </div>

                  <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--muted)' }}>
                    📊 Total de {sales.length} venta{sales.length !== 1 ? 's' : ''} registrada{sales.length !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      {/* MODAL OVERLAY */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            {(displayModels.find((m) => m.id === modalModelId) || pendingUploads.find((m) => m.id === modalModelId)) && (
              <>
                <model-viewer
                  src={genericModelUrl}
                  alt={'Modelo visualizado'}
                  ar
                  auto-rotate
                  camera-controls
                  style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                />
                <div className="modal-info">
                  <h3>{(displayModels.find((m) => m.id === modalModelId) || pendingUploads.find((m) => m.id === modalModelId))?.name}</h3>
                  <p>{(displayModels.find((m) => m.id === modalModelId) || pendingUploads.find((m) => m.id === modalModelId))?.description || 'Modelo pendiente de carga'}</p>
                  <div className="modal-actions">
                    <button className="primary" onClick={() => setShowModal(false)}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
