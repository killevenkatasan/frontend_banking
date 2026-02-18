import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { bankingAPI } from '../services/api';
import './CustomerManagement.css';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('simple'); // 'simple' or 'full'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    country: '',
    city: '',
    income: '',
    date: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await bankingAPI.getAllCustomers();
      setCustomers(response.data);
    } catch (err) {
      setError('Failed to load customers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSimple = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phoneNumber: parseFloat(formData.phoneNumber),
        address: formData.address,
        country: formData.country,
        city: formData.city,
        income: parseInt(formData.income),
        date: formData.date || new Date().toISOString().split('T')[0],
      };

      await bankingAPI.createAccountSimple(data);
      resetForm();
      fetchCustomers();
      alert('Customer created successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create customer.');
      console.error(err);
    }
  };

  const handleCreateFull = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phoneNumber: parseFloat(formData.phoneNumber),
        address: formData.address,
        country: formData.country,
        city: formData.city,
        income: parseInt(formData.income),
        dateOfBirth: formData.dateOfBirth,
      };

      await bankingAPI.createCustomer(data);
      resetForm();
      fetchCustomers();
      alert('Customer created successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create customer. Age must be 18+');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      country: '',
      city: '',
      income: '',
      date: '',
      dateOfBirth: '',
    });
    setShowForm(false);
  };

  const handleDeactivateCustomer = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this customer?')) {
      try {
        await bankingAPI.deactivateCustomer(id);
        fetchCustomers();
        alert('Customer deactivated successfully!');
      } catch (err) {
        alert('Failed to deactivate customer.');
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="customer-management">
      <h1 className="page-title">Customer Management</h1>

      <Card>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Customer'}
        </button>
      </Card>

      {showForm && (
        <Card title="Create New Customer">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${selectedTab === 'simple' ? 'active' : ''}`}
              onClick={() => setSelectedTab('simple')}
            >
              Simple Registration
            </button>
            <button
              className={`tab-btn ${selectedTab === 'full' ? 'active' : ''}`}
              onClick={() => setSelectedTab('full')}
            >
              Full Registration (Age 18+)
            </button>
          </div>

          <form
            onSubmit={selectedTab === 'simple' ? handleCreateSimple : handleCreateFull}
            className="customer-form"
          >
            {/* Common fields */}
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="example@email.com"
              />
            </div>

            <div className="form-group">
              <label>Phone Number (10 digits) *</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="9876543210"
                pattern="[0-9]{10}"
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Street address"
              />
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="City name"
              />
            </div>

            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                placeholder="Country name"
              />
            </div>

            <div className="form-group">
              <label>Annual Income *</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="0"
              />
            </div>

            {/* Tab-specific fields */}
            {selectedTab === 'simple' && (
              <div className="form-group">
                <label>Registration Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {selectedTab === 'full' && (
              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
                <small>Must be 18 years or older</small>
              </div>
            )}

            <button type="submit" className="btn btn-success btn-full">
              Create Customer
            </button>
          </form>
        </Card>
      )}

      <Card title="All Customers">
        {error && <p className="error-message">{error}</p>}
        {customers.length === 0 ? (
          <p className="no-data">No customers found.</p>
        ) : (
          <div className="table-responsive">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City, Country</th>
                  <th>Income</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="name">{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>
                      {customer.city}, {customer.country}
                    </td>
                    <td className="income">
                      ${customer.income?.toLocaleString() || '0'}
                    </td>
                    <td>{customer.age || '-'}</td>
                    <td>
                      <span
                        className={`status ${
                          customer.active ? 'active' : 'inactive'
                        }`}
                      >
                        {customer.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions">
                      {customer.active && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeactivateCustomer(customer.id)}
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default CustomerManagement;
