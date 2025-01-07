import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Grid,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import { getProfile, updateProfile } from '../api';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            setProfile(response.user);
            setPurchasedCourses(response.user.purchasedCourses || []);
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
            <Container maxWidth="lg">
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                {/* Profile Information */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Profile Settings
                        </Typography>
                        {message.text && (
                            <Alert 
                                severity={message.type} 
                                sx={{ mb: 2 }}
                                onClose={() => setMessage({ type: '', text: '' })}
                            >
                                {message.text}
                            </Alert>
                        )}
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
                </Grid>

                {/* Purchased Courses */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            My Courses
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {purchasedCourses.length > 0 ? (
                                purchasedCourses.map((course) => (
                                    <Card key={course._id} sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {course.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Purchase Date: {new Date(course.purchaseDate).toLocaleDateString()}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{ mt: 1 }}
                                                href={`/courses/${course._id}`}
                                            >
                                                View Course
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Typography color="text.secondary">
                                    No courses purchased yet
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile; 