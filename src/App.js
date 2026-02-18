import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CustomerManagement from './pages/CustomerManagement';
import HighIncomeCustomers from './pages/HighIncomeCustomers';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({ name: 'Admin User' });

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar user={user} />}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/high-income" element={<HighIncomeCustomers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
