import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { SalesService } from '../database/mockDatabase'
import '../styles/SalesPage.css'

/**
 * PÁGINA - Gestión de Ventas
 * Registro y análisis de ventas
 */
const SalesPage = React.memo(({ sales, customers, models, isDarkMode }) => {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')

  // Datos procesados
  const salesData = useMemo(() => {
    let filtered = sales

    // Filtrar por estado
    if (filter !== 'all') {
      filtered = filtered.filter(s => s.status === filter)
    }

    // Ordenar
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date)
        case 'date-asc':
          return new Date(a.date) - new Date(b.date)
        case 'amount-desc':
          return b.totalPrice - a.totalPrice
        case 'amount-asc':
          return a.totalPrice - b.totalPrice
        default:
          return 0
      }
    })
  }, [sales, filter, sortBy])

  // Estadísticas
  const stats = useMemo(() => {
    const total = sales.reduce((sum, s) => sum + s.totalPrice, 0)
    const completed = sales.filter(s => s.status === 'completed').length
    const pending = sales.filter(s => s.status === 'pending').length

    return {
      totalVentas: total,
      cantidadVentas: sales.length,
      completadas: completed,
      pendientes: pending,
      promedio: sales.length > 0 ? (total / sales.length).toFixed(2) : 0
    }
  }, [sales])

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId)
    return customer?.name || 'Desconocido'
  }

  const getModelName = (modelId) => {
    const model = models.find(m => m.id === modelId)
    return model?.name || 'Desconocido'
  }

  const statusColor = {
    pending: '#f59e0b',
    completed: '#10b981',
    cancelled: '#ef4444'
  }

  const statusLabel = {
    pending: 'Pendiente',
    completed: 'Completada',
    cancelled: 'Cancelada'
  }

  return (
    <div className={`sales-page ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="page-header">
        <h2>💰 Gestión de Ventas</h2>
      </div>

      {/* KPIs */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">💵 Total</p>
          <p className="stat-value">${stats.totalVentas.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">📊 Cantidad</p>
          <p className="stat-value">{stats.cantidadVentas}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">✅ Completadas</p>
          <p className="stat-value">{stats.completadas}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">⏳ Pendientes</p>
          <p className="stat-value">{stats.pendientes}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">📈 Promedio</p>
          <p className="stat-value">${stats.promedio}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="controls">
        <div className="filter-group">
          <label>Estado:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Ordenar por:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Más Reciente</option>
            <option value="date-asc">Más Antiguo</option>
            <option value="amount-desc">Mayor Monto</option>
            <option value="amount-asc">Menor Monto</option>
          </select>
        </div>
      </div>

      {/* Tabla de Ventas */}
      <div className="sales-table-container">
        {salesData.length > 0 ? (
          <table className="sales-table">
            <thead>
              <tr>
                <th>ID Venta</th>
                <th>Cliente</th>
                <th>Modelo</th>
                <th>Cantidad</th>
                <th>Precio U.</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map(sale => (
                <tr key={sale.id}>
                  <td className="id">{sale.id}</td>
                  <td>{getCustomerName(sale.customerId)}</td>
                  <td>{getModelName(sale.modelId)}</td>
                  <td className="center">{sale.quantity}</td>
                  <td>${sale.unitPrice.toFixed(2)}</td>
                  <td className="total">${sale.totalPrice.toFixed(2)}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: statusColor[sale.status] }}
                    >
                      {statusLabel[sale.status]}
                    </span>
                  </td>
                  <td className="date">
                    {new Date(sale.date).toLocaleDateString('es-ES')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>📭 No hay ventas</p>
          </div>
        )}
      </div>
    </div>
  )
})

SalesPage.propTypes = {
  sales: PropTypes.arrayOf(PropTypes.object).isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDarkMode: PropTypes.bool.isRequired
}

SalesPage.displayName = 'SalesPage'

export default SalesPage
