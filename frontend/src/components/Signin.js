import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { signinUser } from '../api'; // Assume you have an API function to handle signin

const Signin = () => {
    const [formData, setFormData] = useState({
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
            const response = await signinUser(formData);
            alert('Signin successful!');
            // Optionally redirect or clear the form
        } catch (error) {
            console.error('Signin error:', error);
            alert('Failed to sign in');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Signin</Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    name="email" 
                    label="Email" 
                    type="email" 
                    onChange={handleChange} 
                    required 
                    fullWidth 
                    margin="normal" 
                />
                <TextField 
                    name="password" 
                    label="Password" 
                    type="password" 
                    onChange={handleChange} 
                    required 
                    fullWidth 
                    margin="normal" 
                />
                
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

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign In
                </Button>
            </form>
        </Container>
    );
};

export default Signin;