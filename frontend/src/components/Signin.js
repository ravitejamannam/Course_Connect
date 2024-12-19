import React, { useState } from 'react';
import { signin } from '../api';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Signin = ({ setToken }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signin(formData);
            setToken(response.data.token);
            alert('Signin succeeded');
        } catch (error) {
            alert('Signin failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Signin</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        required
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