import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';

const Signup = ({ setToken }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signup(formData);
            if (data.token) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                navigate('/');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            alert(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;