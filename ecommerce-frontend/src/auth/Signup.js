import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link, Box, Paper } from '@mui/material'; // Import Material-UI components
import config from '../config'; // Import the config file
import './Signup.css'; // Import the CSS file for additional styling

function Signup({ onLogin }) {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.backendUrl}auth/signup`, formData);
            alert('Signup successful!');
            navigate('/login');
        } catch (error) {
            console.error('Error during signup:', error.response ? error.response.data : error.message);
            alert('Error during signup');
        }
    };

    return (
        <Container maxWidth="xs" className="signup-container">
            <Paper elevation={3} className="signup-paper">
                <Box className="signup-form" component="form" onSubmit={handleSubmit}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Sign Up
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="signup-button"
                    >
                        Signup
                    </Button>
                </Box>
                <Typography variant="body2" className="signup-footer">
                    Already have an account? <Link href="/login">Login here</Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Signup;