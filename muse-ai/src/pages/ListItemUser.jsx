import React, { useEffect, useState } from 'react';

function ItemUser({ user }) {
    return (
        <li key={user.id}>{user.name} ({user.email})</li>
    );
}

function ListUserContainer({ users }) {
    return (
        <ul>
            {(users || []).map(user => (
                <ItemUser key={user.id} user={user} />
            ))}
        </ul>
    );
}

export default ListUserContainer;