import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { getCourses } from '../api';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourses();
                setCourses(response.courses);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Courses</Typography>
                <Grid container spacing={3}>
                    {courses.map(course => (
                        <Grid item xs={12} sm={6} md={4} key={course._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{course.title}</Typography>
                                    <Typography variant="body2">{course.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary">View Course</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Courses;