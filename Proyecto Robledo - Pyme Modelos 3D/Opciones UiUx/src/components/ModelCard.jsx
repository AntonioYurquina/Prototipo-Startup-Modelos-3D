import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ModelCard.css';

/**
 * COMPONENTE OPTIMIZADO - ModelCard
 * Usa memoización para evitar re-renders innecesarios
 * Implementa Virtual DOM optimization con React.memo
 */
const ModelCard = React.memo(({ model, onSelect, onDelete, isDarkMode }) => {
  const statusColors = {
    published: '#10b981',
    draft: '#f59e0b',
    archived: '#6b7280'
  };

  const statusLabels = {
    published: 'Publicado',
    draft: 'Borrador',
    archived: 'Archivado'
  };

  return (
    <div className={`model-card ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="model-card-header">
        <h3 className="model-name">{model.name}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: statusColors[model.status] }}
        >
          {statusLabels[model.status]}
        </span>
      </div>

      <p className="model-description">{model.description}</p>

      <div className="model-details">
        <div className="detail-item">
          <span className="detail-label">Formato:</span>
          <span className="detail-value">{model.fileFormat.toUpperCase()}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Tamaño:</span>
          <span className="detail-value">{model.fileSize.toFixed(1)} MB</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Descargas:</span>
          <span className="detail-value">{model.downloads}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Ventas:</span>
          <span className="detail-value">{model.sales}</span>
        </div>
      </div>

      {model.link && (
        <div className="model-link">
          <a href={model.link} target="_blank" rel="noopener noreferrer">
            🔗 Ver Modelo en Línea
          </a>
        </div>
      )}

      <div className="model-actions">
        <button 
          className="btn-view"
          onClick={() => onSelect(model.id)}
        >
          Ver Detalles
        </button>
        <button 
          className="btn-delete"
          onClick={() => onDelete(model.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison para optimizar re-renders
  return (
    prevProps.model.id === nextProps.model.id &&
    prevProps.isDarkMode === nextProps.isDarkMode
  );
});

ModelCard.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fileFormat: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    sales: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['published', 'draft', 'archived']).isRequired,
    link: PropTypes.string
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

ModelCard.displayName = 'ModelCard';

export default ModelCard;
