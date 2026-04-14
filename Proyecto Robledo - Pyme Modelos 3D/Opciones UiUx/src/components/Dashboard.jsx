import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SalesService } from '../database/mockDatabase';
import '../styles/Dashboard.css';

/**
 * COMPONENTE - Dashboard de Estadísticas
 * Muestra KPIs importantes del negocio
 * Implementa optimización con useMemo para cálculos
 */
const Dashboard = React.memo(({ isDarkMode }) => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalQuantity: 0,
    completedSales: 0,
    pendingSales: 0,
    averageSale: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await SalesService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="dashboard loading">Cargando estadísticas...</div>;
  }

  const statCards = [
    {
      title: 'Ventas Totales',
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: '💰',
      bgColor: '#10b981'
    },
    {
      title: 'Cantidad Vendida',
      value: stats.totalQuantity,
      icon: '📦',
      bgColor: '#3b82f6'
    },
    {
      title: 'Ventas Completadas',
      value: stats.completedSales,
      icon: '✅',
      bgColor: '#8b5cf6'
    },
    {
      title: 'Ventas Pendientes',
      value: stats.pendingSales,
      icon: '⏳',
      bgColor: '#f59e0b'
    },
    {
      title: 'Venta Promedio',
      value: `$${stats.averageSale.toFixed(2)}`,
      icon: '📊',
      bgColor: '#ec4899'
    }
  ];

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
      <h2 className="dashboard-title">Dashboard de Ventas</h2>
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.bgColor }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Dashboard.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
