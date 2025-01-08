import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { registerUser } from '../api'; // Assume you have an API function to handle registration

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user' // Default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            alert('Registration successful!');
            // Optionally redirect or clear the form
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to register');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="firstName" label="First Name" onChange={handleChange} required />
                <TextField name="lastName" label="Last Name" onChange={handleChange} required />
                <TextField name="email" label="Email" type="email" onChange={handleChange} required />
                <TextField name="password" label="Password" type="password" onChange={handleChange} required />
                
                {/* Dropdown for Role Selection */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit">Register</Button>
            </form>
        </Container>
    );
};

export default Register; 