import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function validate(value) {
    const errors = {};
    if (!value.username) {
        errors.username = 'Username is required';
    }
    if (!value.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
        errors.email = 'Email is invalid';
    }
    if (!value.password) {
        errors.password = 'Password is required';
    } else if (value.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    return errors;
}

function CreateUser({ appData }) {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [sending, setSending] = useState(false);

    const set = (key) => (e) => {
        const next = {...formValues, [key]: e.target.value};
        setFormValues(next);
        if(formErrors[key]) {
            setFormErrors(validate(next));
        }
    };

    const onSubmitAsync = async (e) => {
        e.preventDefault();
        const clientErrors = validate(formValues);
        setFormErrors(clientErrors);
        if(Object.keys(clientErrors).length > 0 ) return;
        
        setSending(true);
        setServerMessage('');
        try {
            const response = await fetch('/php-spa/muse-ai/api/create-user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            setServerMessage('User created successfully');
            navigate('/users'); // Redirect to users page after successful creation
        } catch (error) {
            setServerMessage('Failed to create user');
        } finally {
            setSending(false);
        }
    };
    return (
        <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
            <form onSubmit={onSubmitAsync} noValidate className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">Username:</label>
                    <input type="text" value={formValues.username} onChange={set('username')} className="w-full border border-gray-300 rounded px-3 py-2" />
                    {formErrors.username && <span className="text-red-500 text-sm">{formErrors.username}</span>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Email:</label>
                    <input type="email" value={formValues.email} onChange={set('email')} className="w-full border border-gray-300 rounded px-3 py-2" />
                    {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email}</span>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Password:</label>
                    <input type="password" value={formValues.password} onChange={set('password')} className="w-full border border-gray-300 rounded px-3 py-2" />
                    {formErrors.password && <span className="text-red-500 text-sm">{formErrors.password}</span>}
                </div>
                <button type="submit" disabled={sending} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
                    Create User
                </button>
                {serverMessage && <div className="text-sm text-gray-700 mt-2">{serverMessage}</div>}
            </form>
        </div>
    );
}

export default CreateUser;