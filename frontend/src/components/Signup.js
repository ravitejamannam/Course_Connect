import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting signup form:', formData); // Debug log
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
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Signup
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Signup
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Signup;