import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { bankingAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [highIncomeCount, setHighIncomeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchDashboardData();
  }, [sortBy, sortOrder]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [allResponse, activeResponse, highIncomeResponse] = await Promise.all([
        bankingAPI.getSortedCustomers(sortBy, sortOrder),
        bankingAPI.getActiveCustomers(),
        bankingAPI.getHighIncomeCustomers(),
      ]);

      setCustomers(allResponse.data);
      setActiveCount(activeResponse.data.length);
      setHighIncomeCount(highIncomeResponse.data.length);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{customers.length}</div>
            <div className="stat-label">Total Customers</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{activeCount}</div>
            <div className="stat-label">Active Customers</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{highIncomeCount}</div>
            <div className="stat-label">High Income ({'>'}$100K)</div>
          </div>
        </Card>
      </div>

      <Card title="Customer List (Sortable)">
        {error && <p className="error-message">{error}</p>}

        <div className="sort-controls">
          <div className="sort-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="income">Income</option>
              <option value="id">ID</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="sort-group">
            <label>Order:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {customers.length === 0 ? (
          <p className="no-data">No customers found.</p>
        ) : (
          <div className="customers-grid">
            {customers.map((customer) => (
              <div key={customer.id} className="customer-card">
                <div className="customer-header">
                  <h3>{customer.name}</h3>
                  {customer.active ? (
                    <span className="badge active">Active</span>
                  ) : (
                    <span className="badge inactive">Inactive</span>
                  )}
                </div>
                <div className="customer-info">
                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {customer.phoneNumber}
                  </p>
                  <p>
                    <strong>Location:</strong> {customer.city}, {customer.country}
                  </p>
                  <p>
                    <strong>Income:</strong> ${customer.income?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
