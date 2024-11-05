import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Import the login function

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, token, message } = await login(username, password); // Use the API login function

        if (success) {
            onLogin(token); // Set the token
            console.log('Bearer Token:', token); // Log the Bearer token
            navigate('/products'); // Navigate to the products page
        } else {
            console.error('Login error:', message); // Log the error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
