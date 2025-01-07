import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h2" gutterBottom>
                    Welcome to Course Connect
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Your gateway to online learning
                </Typography>
                <Box mt={4}>
                    <Button
                        component={Link}
                        to="/signup"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mr: 2 }}
                    >
                        Signup
                    </Button>
                    <Button
                        component={Link}
                        to="/signin"
                        variant="outlined"
                        color="primary"
                        size="large"
                    >
                        Signin
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;