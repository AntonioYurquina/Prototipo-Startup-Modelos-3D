import { useState, useEffect } from 'react'
import './App.css'

// Importar páginas modulares
import DashboardPage from './pages/DashboardPage'
import ModelsPage from './pages/ModelsPage'
import SalesPage from './pages/SalesPage'
import LinkGenerator from './features/LinkGenerator'

// Importar servicios
import { ModelService, SalesService, CustomerService } from './database/mockDatabase'

/**
 * APP - Contenedor Principal
 * Gestiona navegación entre módulos y estado global
 */
function App() {
  // Estado global de datos
  const [models, setModels] = useState(() => ModelService.getAll())
  const [sales, setSales] = useState(() => SalesService.getAll())
  const [customers, setCustomers] = useState(() => CustomerService.getAll())
  
  // Estado de UI
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedModel, setSelectedModel] = useState(null)

  // Sincronizar con localStorage
  useEffect(() => {
    const isDarkModeStored = localStorage.getItem('isDarkMode')
    if (isDarkModeStored !== null) {
      setIsDarkMode(JSON.parse(isDarkModeStored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  // Handlers
  const handleSelectModel = (modelId) => {
    setSelectedModel(modelId)
    setCurrentPage('link-generator')
  }

  const handleDeleteModel = (modelId) => {
    setModels(models.filter(m => m.id !== modelId))
    if (selectedModel === modelId) {
      setSelectedModel(null)
    }
  }

  const handleAddNewModel = (newModel) => {
    const modelWithId = { ...newModel, id: Date.now() }
    setModels([...models, modelWithId])
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Obtener modelo seleccionado
  const currentModel = selectedModel ? models.find(m => m.id === selectedModel) : null

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`} style={{ '--theme-primary': '#3b82f6' }}>
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Alternar menú"
          >
            ☰
          </button>
          <h1 className="app-title">🏭 Robledo - Hub Modelos 3D</h1>
        </div>
        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={handleToggleDarkMode}
            title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Layout principal */}
      <div className="app-layout">
        {/* Sidebar Navigation */}
        <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
              >
                <span className="icon">📊</span>
                <span className="label">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${currentPage === 'models' ? 'active' : ''}`}
                onClick={() => setCurrentPage('models')}
              >
                <span className="icon">📦</span>
                <span className="label">Modelos</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${currentPage === 'sales' ? 'active' : ''}`}
                onClick={() => setCurrentPage('sales')}
              >
                <span className="icon">💰</span>
                <span className="label">Ventas</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${currentPage === 'link-generator' ? 'active' : ''}`}
                onClick={() => setCurrentPage('link-generator')}
              >
                <span className="icon">🔗</span>
                <span className="label">Generar Links</span>
              </button>
            </li>
          </ul>

          {/* Footer del sidebar */}
          <div className="sidebar-footer">
            <div className="version-badge">v1.1.0</div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {currentPage === 'dashboard' && (
            <DashboardPage
              models={models}
              sales={sales}
              customers={customers}
              isDarkMode={isDarkMode}
            />
          )}

          {currentPage === 'models' && (
            <ModelsPage
              models={models}
              isDarkMode={isDarkMode}
              onSelectModel={handleSelectModel}
              onDeleteModel={handleDeleteModel}
            />
          )}

          {currentPage === 'sales' && (
            <SalesPage
              sales={sales}
              customers={customers}
              models={models}
              isDarkMode={isDarkMode}
            />
          )}

          {currentPage === 'link-generator' && (
            <div className="page-wrapper">
              <LinkGenerator
                model={currentModel}
                isDarkMode={isDarkMode}
                onSelectModel={handleSelectModel}
                models={models}
              />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 Robledo PYME - Modelos 3D para E-Commerce</p>
      </footer>
    </div>
  )
}

export default App
