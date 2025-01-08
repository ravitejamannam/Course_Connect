import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { createCourse } from '../../api';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCourse(courseData);
            alert('Course added successfully!');
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Add New Course</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="title" label="Title" onChange={handleChange} required />
                <TextField name="description" label="Description" onChange={handleChange} required />
                <TextField name="price" label="Price" type="number" onChange={handleChange} required />
                <TextField name="originalPrice" label="Original Price" type="number" onChange={handleChange} required />
                <TextField name="imageUrl" label="Image URL" onChange={handleChange} required />
                <Button type="submit">Add Course</Button>
            </form>
        </Container>
    );
};

export default AddCourse; 