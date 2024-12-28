import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = ({ token, setToken }) => {
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
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
                    <Box sx={{ flexShrink: 0 }}>
                        <Typography 
                            variant="h5" 
                            component={Link} 
                            to="/" 
                            sx={{ 
                                textDecoration: 'none',
                                color: '#1976d2',
                                fontWeight: 700,
                                fontSize: '24px',
                                display: 'block',
                                '&:hover': {
                                    color: '#1565c0'
                                }
                            }}
                        >
                            Course Connect
                        </Typography>
                    </Box>

                    {/* Center Navigation */}
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2,
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Button 
                            component={Link} 
                            to="/courses"
                            sx={{ 
                                color: 'text.primary',
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                        >
                            Courses
                        </Button>
                    </Box>

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
                                        borderRadius: '8px'
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
                                        borderRadius: '8px'
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