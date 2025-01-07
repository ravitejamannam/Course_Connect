import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = ({ token, setToken }) => {
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Course Connect
                </Typography>
                <Box>
                    {!token ? (
                        <>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            <Button color="inherit" component={Link} to="/signin">Signin</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/courses">Courses</Button>
                            <Button color="inherit" component={Link} to="/purchases">Purchases</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;