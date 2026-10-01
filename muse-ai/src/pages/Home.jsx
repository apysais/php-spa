import React from 'react';

export default function Home({ appData }) {
  return (
    <div>
      <h1>Home</h1>
      <p>App: {appData.settings?.appName} v{appData.settings?.version}</p>
      <p>This page was bootstrapped by PHP (window.APP_DATA), rendered by React.</p>
    </div>
  );
}
