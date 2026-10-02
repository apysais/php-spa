import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import NavLinkItem from './NavLinkItem';

/*function NavLinkItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `mr-3 ${isActive ? 'font-bold text-blue-600' : 'font-normal text-gray-700 hover:text-blue-600'}`
      }
    >
      {children}
    </NavLink>
  );
}*/


export default function Layout({ appData }) {
  const navigate = useNavigate();

  return (
    <div className="font-sans p-5">
      <nav className="border-b border-gray-300 pb-2.5 mb-5">
        <NavLinkItem to="/">
          Home
        </NavLinkItem>
        <NavLinkItem to="/dashboard">
          Dashboard
        </NavLinkItem>
        <NavLinkItem to="/user/1">
          User 1
        </NavLinkItem>
        <NavLinkItem to="/users">
          Users
        </NavLinkItem>
        <NavLinkItem to="/logout">
          Logout
        </NavLinkItem>
        <button
          onClick={() => navigate('/user/2')}
          className="ml-3 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm border border-gray-300"
        >
          Go to User 2 (programmatic)
        </button>
        <span className="ml-5 text-gray-600 text-sm">
          Logged in as: {appData.user?.name} ({appData.user?.role})
        </span>
      </nav>
      <Outlet />
    </div>
  );
}