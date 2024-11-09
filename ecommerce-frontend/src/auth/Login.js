import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Add this line
import config from '../config';

function Login({ onLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.post(`${config.backendUrl}auth/login`, formData);
            alert('Login successful!');
            onLogin();
            navigate('/products');
        } catch (error) {
            console.error('Error during login:', error);
            setErrors({ form: 'Invalid credentials' });
        }
    };

    return (
        <div className="login-container"> 
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2> 
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="login-input"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="login-input"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div> 
    );
}

export default Login;