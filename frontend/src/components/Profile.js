import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Box, 
    Alert 
} from '@mui/material';
import { getProfile, updateProfile } from '../api';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            setProfile(response.user);
            setLoading(false);
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to load profile' 
            });
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfile(profile);
            setMessage({ 
                type: 'success', 
                text: 'Profile updated successfully' 
            });
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to update profile' 
            });
        }
    };

    if (loading) {
        return (
            <Container maxWidth="sm">
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            {message.text && (
                <Alert 
                    severity={message.type} 
                    sx={{ mb: 2 }}
                    onClose={() => setMessage({ type: '', text: '' })}
                >
                    {message.text}
                </Alert>
            )}
            
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Profile Settings
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Update Profile
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile; 