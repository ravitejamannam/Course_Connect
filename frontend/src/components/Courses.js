import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button,
    Box,
    Alert,
    Snackbar 
} from '@mui/material';
import { getCourses, purchaseCourse } from '../api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState({ open: false, text: '', type: 'success' });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            setCourses(response.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setMessage({
                open: true,
                text: 'Failed to load courses',
                type: 'error'
            });
        }
    };

    const handlePurchase = async (courseId) => {
        try {
            await purchaseCourse(courseId);
            setMessage({
                open: true,
                text: 'Course purchased successfully!',
                type: 'success'
            });
        } catch (error) {
            setMessage({
                open: true,
                text: error.response?.data?.message || 'Failed to purchase course',
                type: 'error'
            });
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Available Courses
            </Typography>
            
            <Snackbar 
                open={message.open} 
                autoHideDuration={6000} 
                onClose={() => setMessage({ ...message, open: false })}
            >
                <Alert 
                    severity={message.type}
                    onClose={() => setMessage({ ...message, open: false })}
                >
                    {message.text}
                </Alert>
            </Snackbar>

            <Grid container spacing={3}>
                {courses.map((course) => (
                    <Grid item xs={12} md={4} key={course._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={course.imageUrl}
                                alt={course.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {course.title}
                                </Typography>
                                <Typography>
                                    {course.description}
                                </Typography>
                                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="h6" color="primary">
                                        ₹{course.price}
                                    </Typography>
                                    <Typography 
                                        sx={{ 
                                            textDecoration: 'line-through',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        ₹{course.originalPrice}
                                    </Typography>
                                    <Typography 
                                        sx={{ 
                                            color: 'success.main',
                                            ml: 'auto'
                                        }}
                                    >
                                        {Math.round((1 - course.price/course.originalPrice) * 100)}% off
                                    </Typography>
                                </Box>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    sx={{ mt: 2 }}
                                    onClick={() => handlePurchase(course._id)}
                                >
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Courses; 