import React, { useEffect } from 'react';

export default function Logout() {
  useEffect(() => {
    fetch('./api/logout.php', { method: 'POST', credentials: 'same-origin' })
      .finally(() => {
        window.location.href = './'; // Full reload on purpose: session is gone, PHP must reboot
      });
  }, []);

  return <h1>Logging out… (destroying PHP session)</h1>;
}
