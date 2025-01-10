import React from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box, 
    Container,
    IconButton,
    Menu,
    MenuItem,
    Avatar
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

const NavBar = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        handleClose();
        navigate('/');
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 600
                        }}
                    >
                        Course Connect
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            component={Link}
                            to="/courses"
                            color="inherit"
                        >
                            Courses
                        </Button>

                        {token ? (
                            <>
                                <IconButton
                                    size="large"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>
                                        <AccountCircle />
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem 
                                        component={Link} 
                                        to="/profile"
                                        onClick={handleClose}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem 
                                        component={Link} 
                                        to="/my-courses"
                                        onClick={handleClose}
                                    >
                                        My Courses
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="/signin"
                                    color="inherit"
                                    variant="outlined"
                                    sx={{
                                        borderColor: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    component={Link}
                                    to="/signup"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign Up
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