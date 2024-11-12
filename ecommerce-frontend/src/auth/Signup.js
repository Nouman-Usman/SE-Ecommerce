import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link, Box, Paper, CircularProgress, Alert, InputAdornment, IconButton } from '@mui/material'; // Import Material-UI components
import { Visibility, VisibilityOff } from '@mui/icons-material';
import config from '../config'; // Import the config file
import './Signup.css'; // Import the CSS file for additional styling

function Signup({ onLogin }) {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setServerError('');
        
        try {
            await axios.post(`${config.backendUrl}auth/signup`, formData);
            navigate('/login');
        } catch (error) {
            setServerError(error.response?.data?.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" className="signup-container">
            <Paper elevation={3} className="signup-paper">
                <Box className="signup-brand">
                    {/* Add your logo here */}
                    <Typography variant="h4" component="h1">
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Join our community of shoppers
                    </Typography>
                </Box>

                {serverError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {serverError}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} className="signup-form">
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
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
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="signup-button"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                </Box>

                <Box className="signup-footer">
                    <Typography variant="body2">
                        Already have an account? <Link href="/login" className="login-link">Login here</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default Signup;