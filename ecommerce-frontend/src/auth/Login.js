import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material'; // Import Material-UI components
import './Login.css'; // Import the CSS file for additional styling

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
        <Container maxWidth="xs" className="login-container">
            <Paper elevation={3} className="login-paper">
                <Box className="login-form" component="form" onSubmit={handleSubmit}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    {errors.form && <Typography color="error">{errors.form}</Typography>}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;