import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import User from './pages/User.jsx';
import Logout from './pages/Logout.jsx';

export default function App({ appData }) {
  const can = (perm) => (appData.permissions || []).includes(perm);

  return (
    <Routes>
      {/* Nested routes: Layout renders Nav + <Outlet/> */}
      <Route element={<Layout appData={appData} />}>
        <Route index element={<Home appData={appData} />} />
        <Route
          path="dashboard"
          element={can('view_dashboard') ? <Dashboard appData={appData} /> : <Navigate to="/" replace />}
        />
        {/* Route parameter example: /user/1 */}
        <Route path="user/:id" element={<User appData={appData} />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<h2>404 - React Router: page not found</h2>} />
      </Route>
    </Routes>
  );
}
