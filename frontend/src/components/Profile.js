import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Box, 
    Divider,
    Alert
} from '@mui/material';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/v1/user/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data.user);
            setLoading(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load profile' });
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:3000/api/v1/user/profile',
                profile,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                'http://localhost:3000/api/v1/user/change-password',
                {
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage({ type: 'success', text: 'Password updated successfully' });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update password' });
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {message.text && (
                <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
                </Alert>
            )}
            
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Profile Settings
                </Typography>
                
                {/* Profile Information */}
                <Box component="form" onSubmit={handleProfileUpdate} sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Personal Information
                    </Typography>
                    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                        <TextField
                            label="First Name"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            fullWidth
                        />
                    </Box>
                    <TextField
                        label="Email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ mt: 2 }}
                    >
                        Update Profile
                    </Button>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Password Change */}
                <Box component="form" onSubmit={handlePasswordChange}>
                    <Typography variant="h6" gutterBottom>
                        Change Password
                    </Typography>
                    <TextField
                        type="password"
                        label="Current Password"
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        type="password"
                        label="New Password"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        type="password"
                        label="Confirm New Password"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained"
                    >
                        Change Password
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile; 