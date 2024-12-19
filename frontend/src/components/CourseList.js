import React, { useEffect, useState } from 'react';
import { getCourses, purchaseCourse } from '../api';
import { Container, Typography, Box, Button, Card, CardContent, CardActions } from '@mui/material';

const CourseList = ({ token }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getCourses();
            setCourses(response.data.courses);
        };
        fetchCourses();
    }, []);

    const handlePurchase = async (courseId) => {
        try {
            await purchaseCourse(courseId, token);
            alert('Course purchased successfully');
        } catch (error) {
            alert('Purchase failed');
        }
    };

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Courses</Typography>
                {courses.map(course => (
                    <Card key={course._id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5">{course.title}</Typography>
                            <Typography variant="body2">{course.description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handlePurchase(course._id)} variant="contained" color="primary">
                                Purchase
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default CourseList;