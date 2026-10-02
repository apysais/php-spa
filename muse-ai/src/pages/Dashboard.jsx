import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ appData }) {
  const navigate = useNavigate(); // ← returns the navigation function
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {appData.user?.name}</p>
      <p>Permissions: {(appData.permissions || []).join(', ')}</p>
      <button onClick={() => navigate('/user/1')}>View User 1</button>
    </div>
  );
}
