import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🏦 Banking System</h1>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/high-income">High Income</Link>
          </li>
        </ul>
        <div className="navbar-user">
          {user && <span className="user-name">{user.name}</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
