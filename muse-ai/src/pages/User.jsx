import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Renders the user details page.
 * Displays user information based on the provided appData and URL parameter.
 * Fetches user data from the PHP API if not available in the initial appData.
 * Handles loading and error states gracefully.
 * @example
 * <User appData={appData} />
 * @param {{ appData: any }} param0  The props object containing appData.
 * @returns {JSX.Element} The rendered User component.
 */
function User({ appData }) {
  const { id } = useParams(); // /user/1 => id="1"
  
  // Initialize user state from inline appData if available, otherwise set to null.
  const [user, setUser] = useState(() =>
    (appData.users || []).find((u) => String(u.id) === String(id))
  );
  // Status can be 'from-php-inline', 'loading', 'from-php-api', or 'not-found'.
  // React state for the user data and its loading status.
  const [status, setStatus] = useState(user ? 'from-php-inline' : 'loading');

  // Fallback: if not in inline payload, fetch fresh from PHP API
  // Effect hook to fetch user data from the PHP API if not available inline.
  useEffect(() => {
    // Only fetch if the user is not already set from inline appData.
    if (user) return;
    // Fetch user data from the PHP API.
    setStatus('loading');

    // Initiate the fetch request to the PHP API.
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

  // Render loading, error, or user details based on the current status.
  if (status === 'loading') return <p>Loading user {id}…</p>;
  // If the user is not found or the status indicates not found, render an error message.
  if (status === 'not-found' || !user) return <h2>User {id} not found (PHP says so)</h2>;

  // At this point, the user is guaranteed to be available and the status is either 'from-php-inline' or 'from-php-api'.
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

export default User;
