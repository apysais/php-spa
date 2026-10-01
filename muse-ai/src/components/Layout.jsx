import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Layout({ appData }) {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    marginRight: 12,
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <div style={{ fontFamily: 'system-ui', padding: 20 }}>
      <nav style={{ borderBottom: '1px solid #ccc', paddingBottom: 10, marginBottom: 20 }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/user/1" style={linkStyle}>User 1</NavLink>
        <NavLink to="/logout" style={linkStyle}>Logout</NavLink>
        <button onClick={() => navigate('/user/2')} style={{ marginLeft: 12 }}>
          Go to User 2 (programmatic)
        </button>
        <span style={{ marginLeft: 20 }}>
          Logged in as: {appData.user?.name} ({appData.user?.role})
        </span>
      </nav>
      <Outlet />
    </div>
  );
}
