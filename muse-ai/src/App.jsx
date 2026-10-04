import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import User from './pages/User.jsx';
import Logout from './pages/Logout.jsx';
import Users from './pages/Users.jsx';
import CreateUser from './pages/CreateUser.jsx';

/**
 * The main application component that sets up routing for the SPA.
 * @param {{ appData: Object }} param0 The props object containing the appData.
 * @returns {JSX.Element} The rendered App component.
 */
function App({ appData }) {
  // Helper function to check if the user has a specific permission.
  // Usage: can('view_dashboard') will return true if the user has the 'view_dashboard' permission.
  // Returns true if the user has the specified permission, false otherwise.
  // Example: can('edit_user') will check if the user has the 'edit_user' permission.
  // The 'can' function is used throughout the app to conditionally render components based on user permissions.
  // Define the 'can' function to check user permissions.
  // The 'can' function takes a permission string as an argument and checks if it exists in the user's permissions array.
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
        <Route path="users" element={<Users appData={appData} />} />
        <Route path="create-user" element={<CreateUser appData={appData} />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<h2>404 - React Router: page not found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;