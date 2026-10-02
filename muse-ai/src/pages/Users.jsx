import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListUserContainer from './ListItemUser';

function getUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        fetch('/php-spa/muse-ai/api/users.php')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => {
                // Convert { "1": {...}, "2": {...} } → [{...}, {...}]
                const usersArray = Object.values(data || {});
                setUsers(usersArray);
            })
            .catch(err => {
                console.error('Failed to load users:', err);
                setUsers([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <ListUserContainer users={users} />
    );
}

export default getUsers;