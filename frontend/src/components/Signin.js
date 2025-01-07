import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { signin } from '../api';

const Signin = ({ setToken }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signin(formData);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            alert('Signin successful');
        } catch (error) {
            alert('Signin failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Signin
                </Typography>
                <form onSubmit={handleSubmit}>
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
                        Signin
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Signin;