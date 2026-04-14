import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import ModelCard from '../components/ModelCard'
import '../styles/ModelsPage.css'

/**
 * PÁGINA - Gestión de Modelos
 * Muestra listado de modelos con filtrado y búsqueda
 */
const ModelsPage = React.memo(({ models, isDarkMode, onSelectModel, onDeleteModel }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Filtrado y búsqueda
  const filteredModels = useMemo(() => {
    return models.filter(model => {
      // Filtro por estado
      const matchesFilter = activeFilter === 'all' || model.status === activeFilter

      // Búsqueda por nombre o descripción
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [models, searchTerm, activeFilter])

  const stats = useMemo(() => ({
    total: models.length,
    published: models.filter(m => m.status === 'published').length,
    draft: models.filter(m => m.status === 'draft').length,
    archived: models.filter(m => m.status === 'archived').length
  }), [models])

  return (
    <div className={`models-page ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="page-header">
        <h2>📦 Gestión de Modelos 3D</h2>
        <p className="subtitle">Total: {models.length} modelos | Publicados: {stats.published}</p>
      </div>

      {/* Buscador */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Buscar modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="results-count">
          {filteredModels.length} resultados
        </span>
      </div>

      {/* Filtros */}
      <div className="filters">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          📊 Todos ({stats.total})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'published' ? 'active' : ''}`}
          onClick={() => setActiveFilter('published')}
        >
          ✅ Publicados ({stats.published})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'draft' ? 'active' : ''}`}
          onClick={() => setActiveFilter('draft')}
        >
          📝 Borradores ({stats.draft})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'archived' ? 'active' : ''}`}
          onClick={() => setActiveFilter('archived')}
        >
          📦 Archivados ({stats.archived})
        </button>
      </div>

      {/* Lista de Modelos */}
      <div className="models-list">
        {filteredModels.length > 0 ? (
          filteredModels.map(model => (
            <ModelCard
              key={model.id}
              model={model}
              onSelect={() => onSelectModel(model.id)}
              onDelete={() => onDeleteModel(model.id)}
              isDarkMode={isDarkMode}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>😴 No hay modelos que coincidan con tu búsqueda</p>
            <p className="hint">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
})

ModelsPage.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onSelectModel: PropTypes.func.isRequired,
  onDeleteModel: PropTypes.func.isRequired
}

ModelsPage.displayName = 'ModelsPage'

export default ModelsPage
