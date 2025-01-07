import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';
import { createCourse } from '../../api';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        image: null
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            await createCourse(formDataToSend);
            setMessage({ 
                type: 'success', 
                text: 'Course created successfully' 
            });
            setFormData({
                title: '',
                description: '',
                price: '',
                originalPrice: '',
                image: null
            });
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to create course' 
            });
        }
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Course
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
                        label="Course Title"
                        fullWidth
                        margin="normal"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                    <TextField
                        label="Original Price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        required
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Upload Course Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                    {formData.image && (
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Selected file: {formData.image.name}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Create Course
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CourseForm; 