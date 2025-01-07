import React from 'react';
import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemText, 
    Toolbar, 
    Typography,
    Box,
    ListItemIcon 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import DownloadIcon from '@mui/icons-material/Download';

const drawerWidth = 240;

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Courses', icon: <SchoolIcon />, path: '/courses' },
        { text: 'Purchases', icon: <DownloadIcon />, path: '/purchases' }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: drawerWidth, 
                    boxSizing: 'border-box',
                    bgcolor: 'white',
                    border: 'none',
                    boxShadow: '0 0 10px rgba(0,0,0,0.05)'
                },
            }}
        >
            <Toolbar />
            <Box sx={{ px: 2, py: 3 }}>
                <Typography 
                    variant="subtitle2" 
                    sx={{ 
                        color: '#666',
                        fontWeight: 600,
                        mb: 2,
                        px: 1
                    }}
                >
                    MAIN MENU
                </Typography>
                <List sx={{ p: 0 }}>
                    {menuItems.map((item) => (
                        <ListItem 
                            component={Link} 
                            to={item.path}
                            key={item.text}
                            sx={{
                                borderRadius: '8px',
                                mb: 0.5,
                                bgcolor: location.pathname === item.path ? '#F5F7F9' : 'transparent',
                                color: location.pathname === item.path ? 'primary.main' : '#666',
                                '&:hover': {
                                    bgcolor: '#F5F7F9'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ 
                                color: location.pathname === item.path ? 'primary.main' : '#666',
                                minWidth: '40px'
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: location.pathname === item.path ? 600 : 500
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;