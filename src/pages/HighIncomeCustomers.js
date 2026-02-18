import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { bankingAPI } from '../services/api';
import './HighIncomeCustomers.css';

function HighIncomeCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHighIncomeCustomers();
  }, []);

  const fetchHighIncomeCustomers = async () => {
    try {
      setLoading(true);
      const response = await bankingAPI.getHighIncomeCustomers();
      setCustomers(response.data);
    } catch (err) {
      setError('Failed to load high-income customers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  // Calculate stats
  const totalCustomers = customers.length;
  const totalIncome = customers.reduce((sum, c) => sum + (c.income || 0), 0);
  const avgIncome = totalCustomers > 0 ? totalIncome / totalCustomers : 0;

  return (
    <div className="high-income-customers">
      <h1 className="page-title">High Income Customers ({'>'}$100,000)</h1>

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{totalCustomers}</div>
            <div className="stat-label">Total High Income Customers</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-amount">
              ${totalIncome.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="stat-label">Combined Income</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-amount">
              ${avgIncome.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="stat-label">Average Income</div>
          </div>
        </Card>
      </div>

      <Card title="Customer Details">
        {error && <p className="error-message">{error}</p>}
        {customers.length === 0 ? (
          <p className="no-data">No high-income customers found.</p>
        ) : (
          <div className="customers-container">
            {customers.map((customer) => (
              <div key={customer.id} className="customer-detail-card">
                <div className="customer-top">
                  <div>
                    <h3 className="customer-name">{customer.name}</h3>
                    <p className="customer-id">ID: {customer.id}</p>
                  </div>
                  <div className="income-badge">
                    ${customer.income?.toLocaleString('en-US')}
                  </div>
                </div>

                <div className="customer-divider"></div>

                <div className="customer-details">
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{customer.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{customer.phoneNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">
                      {customer.city}, {customer.country}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{customer.address}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status ${customer.active ? 'active' : 'inactive'}`}>
                      {customer.active ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                  {customer.age && (
                    <div className="detail-row">
                      <span className="detail-label">Age:</span>
                      <span className="detail-value">{customer.age} years</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default HighIncomeCustomers;
