import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                backgroundColor: 'white', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: 'black',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Container maxWidth="lg">
                <Toolbar 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '64px'
                    }}
                >
                    {/* Logo/Brand Section */}
                    <Typography 
                        component={Link} 
                        to="/" 
                        sx={{ 
                            textDecoration: 'none',
                            color: '#1976d2',
                            fontWeight: 700,
                            fontSize: '24px'
                        }}
                    >
                        Course Connect
                    </Typography>

                    {/* Auth Buttons */}
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2,
                        alignItems: 'center'
                    }}>
                        {!token ? (
                            <>
                                <Button 
                                    component={Link} 
                                    to="/signin"
                                    variant="outlined"
                                    sx={{ 
                                        textTransform: 'none',
                                        borderRadius: '8px',
                                        color: '#1976d2',
                                        borderColor: '#1976d2',
                                        '&:hover': {
                                            borderColor: '#1565c0',
                                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button 
                                    component={Link} 
                                    to="/signup"
                                    variant="contained"
                                    sx={{ 
                                        textTransform: 'none',
                                        borderRadius: '8px',
                                        backgroundColor: '#1976d2',
                                        '&:hover': {
                                            backgroundColor: '#1565c0'
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    component={Link} 
                                    to="/profile"
                                    sx={{ 
                                        color: 'text.primary',
                                        textTransform: 'none'
                                    }}
                                >
                                    Profile
                                </Button>
                                <Button 
                                    onClick={handleLogout}
                                    variant="outlined"
                                    sx={{ 
                                        textTransform: 'none',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;