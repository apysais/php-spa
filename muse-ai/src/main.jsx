import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const appData = window.APP_DATA || { user: null, users: [], permissions: [], settings: {} };

// basename MUST equal APP_BASE + .htaccess RewriteBase
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/php-spa/muse-ai">
      <App appData={appData} />
    </BrowserRouter>
  </React.StrictMode>
);
