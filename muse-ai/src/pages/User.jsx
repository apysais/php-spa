import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function User({ appData }) {
  const { id } = useParams(); // /user/1 => id="1"
  const [user, setUser] = useState(() =>
    (appData.users || []).find((u) => String(u.id) === String(id))
  );
  const [status, setStatus] = useState(user ? 'from-php-inline' : 'loading');

  // Fallback: if not in inline payload, fetch fresh from PHP API
  useEffect(() => {
    if (user) return;
    setStatus('loading');
    fetch(`./api/user.php?id=${encodeURIComponent(id)}`, { credentials: 'same-origin' })
      .then((r) => {
        if (!r.ok) throw new Error(`PHP API ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setUser(json.user);
        setStatus('from-php-api');
      })
      .catch(() => setStatus('not-found'));
  }, [id]); // eslint-disable-line

  if (status === 'loading') return <p>Loading user {id}…</p>;
  if (status === 'not-found' || !user) return <h2>User {id} not found (PHP says so)</h2>;

  return (
    <div>
      <h1>User {user.id}</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <small>Source: {status} (both originate from PHP)</small>
    </div>
  );
}
