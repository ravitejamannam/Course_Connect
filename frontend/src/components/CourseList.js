import React, { useEffect, useState } from 'react';
import { getCourses, purchaseCourse } from '../api';
import { Container, Typography, Box } from '@mui/material';
import CourseCard from './CourseCard';

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
                    <CourseCard key={course._id} course={course} onPurchase={handlePurchase} />
                ))}
            </Box>
        </Container>
    );
};

export default CourseList;