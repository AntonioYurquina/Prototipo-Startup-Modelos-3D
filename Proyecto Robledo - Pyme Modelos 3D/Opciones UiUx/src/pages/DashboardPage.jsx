import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import '../styles/DashboardPage.css'

/**
 * PÁGINA - Dashboard Principal
 * Vista consolidada de KPIs y métricas
 */
const DashboardPage = React.memo(({ models, sales, customers, isDarkMode }) => {
  const [period, setPeriod] = useState('month')

  // Filtrar datos por período
  const filteredSales = useMemo(() => {
    const now = new Date()
    return sales.filter(sale => {
      const saleDate = new Date(sale.date)
      const diffTime = Math.abs(now - saleDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      switch (period) {
        case 'week':
          return diffDays <= 7
        case 'month':
          return diffDays <= 30
        case 'quarter':
          return diffDays <= 90
        case 'year':
          return diffDays <= 365
        default:
          return true
      }
    })
  }, [sales, period])

  // Estadísticas calculadas
  const metrics = useMemo(() => {
    const totalVentas = filteredSales.reduce((sum, s) => sum + s.totalPrice, 0)
    const completadas = filteredSales.filter(s => s.status === 'completed').length
    const pendientes = filteredSales.filter(s => s.status === 'pending').length

    return {
      revenue: totalVentas,
      sales: filteredSales.length,
      completed: completadas,
      pending: pendientes,
      customers: customers.length,
      models: models.length,
      avgOrderValue: filteredSales.length > 0 ? (totalVentas / filteredSales.length).toFixed(2) : 0,
      conversionRate: models.length > 0 
        ? ((completadas / filteredSales.length * 100) || 0).toFixed(1) 
        : 0
    }
  }, [filteredSales, customers, models])

  // Modelos más vendidos
  const topModels = useMemo(() => {
    const modelSales = {}
    filteredSales.forEach(sale => {
      if (!modelSales[sale.modelId]) {
        modelSales[sale.modelId] = { count: 0, revenue: 0 }
      }
      modelSales[sale.modelId].count++
      modelSales[sale.modelId].revenue += sale.totalPrice
    })

    return Object.entries(modelSales)
      .map(([modelId, data]) => ({
        modelId,
        modelName: models.find(m => m.id === modelId)?.name || 'Desconocido',
        ...data
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }, [filteredSales, models])

  // Línea de tendencia (últimos 7 días)
  const trend = useMemo(() => {
    const dailyData = {}
    sales.forEach(sale => {
      const date = new Date(sale.date).toLocaleDateString('es-ES')
      if (!dailyData[date]) {
        dailyData[date] = 0
      }
      dailyData[date] += sale.totalPrice
    })

    return Object.entries(dailyData)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .slice(-7)
      .map(([date, amount]) => ({ date, amount }))
  }, [sales])

  return (
    <div className={`dashboard-page ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="dash-header">
        <div>
          <h2>📊 Dashboard</h2>
          <p className="header-subtitle">Bienvenido a tu centro de control</p>
        </div>
        <div className="period-selector">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">Última Semana</option>
            <option value="month">Último Mes</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Año</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card primary">
          <div className="kpi-icon">💰</div>
          <div className="kpi-content">
            <p className="kpi-label">Ingresos</p>
            <p className="kpi-value">${metrics.revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">📦</div>
          <div className="kpi-content">
            <p className="kpi-label">Ventas</p>
            <p className="kpi-value">{metrics.sales}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">✅</div>
          <div className="kpi-content">
            <p className="kpi-label">Completadas</p>
            <p className="kpi-value">{metrics.completed}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">⏳</div>
          <div className="kpi-content">
            <p className="kpi-label">Pendientes</p>
            <p className="kpi-value">{metrics.pending}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">👥</div>
          <div className="kpi-content">
            <p className="kpi-label">Clientes</p>
            <p className="kpi-value">{metrics.customers}</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">🎨</div>
          <div className="kpi-content">
            <p className="kpi-label">Modelos</p>
            <p className="kpi-value">{metrics.models}</p>
          </div>
        </div>
      </div>

      {/* Análisis */}
      <div className="analytics-grid">
        {/* Modelos Top */}
        <div className="analysis-card">
          <h3>🏆 Modelos Más Vendidos</h3>
          <div className="models-list">
            {topModels.length > 0 ? (
              topModels.map((model, idx) => (
                <div key={model.modelId} className="model-item">
                  <span className="rank">#{idx + 1}</span>
                  <div className="model-info">
                    <p className="name">{model.modelName}</p>
                    <p className="stats">{model.count} venta(s) · ${model.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty">No hay datos</p>
            )}
          </div>
        </div>

        {/* Métricas Clave */}
        <div className="analysis-card">
          <h3>📈 Métricas Clave</h3>
          <div className="metrics-list">
            <div className="metric-row">
              <span className="label">Ticket Promedio</span>
              <span className="value">${metrics.avgOrderValue}</span>
            </div>
            <div className="metric-row">
              <span className="label">Tasa de Conversión</span>
              <span className="value">{metrics.conversionRate}%</span>
            </div>
            <div className="metric-row">
              <span className="label">Período</span>
              <span className="value cap">{period}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tendencia */}
      <div className="trend-card">
        <h3>📉 Tendencia de Ingresos (Últimos 7 días)</h3>
        <div className="trend-chart">
          {trend.length > 0 ? (
            <div className="bars">
              {trend.map((day, idx) => {
                const maxAmount = Math.max(...trend.map(t => t.amount), 1)
                const height = (day.amount / maxAmount) * 100
                return (
                  <div key={idx} className="bar-group">
                    <div
                      className="bar"
                      style={{ height: `${height}%` }}
                      title={`$${day.amount.toFixed(2)}`}
                    />
                    <span className="label">{day.date.substring(0, 5)}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="empty-chart">Sin datos para mostrar</p>
          )}
        </div>
      </div>
    </div>
  )
})

DashboardPage.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  sales: PropTypes.arrayOf(PropTypes.object).isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDarkMode: PropTypes.bool.isRequired
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
