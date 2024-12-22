import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Course Connect
                </Typography>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                <Button color="inherit" component={Link} to="/signin">Signin</Button>
                <Button color="inherit" component={Link} to="/courses">Courses</Button>
                <Button color="inherit" component={Link} to="/purchases">Purchases</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;