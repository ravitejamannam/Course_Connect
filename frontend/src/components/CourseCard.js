// filepath: /Users/ravitejamannam/Course_Connect/frontend/src/components/CourseCard.js
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const CourseCard = ({ course, onPurchase }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="body2">{course.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => onPurchase(course._id)} variant="contained" color="primary">
                    Purchase
                </Button>
            </CardActions>
        </Card>
    );
};

export default CourseCard;