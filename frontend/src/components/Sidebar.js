import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { Home, School, ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Divider />
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/courses">
                    <ListItemIcon><School /></ListItemIcon>
                    <ListItemText primary="Courses" />
                </ListItem>
                <ListItem button component={Link} to="/purchases">
                    <ListItemIcon><ShoppingCart /></ListItemIcon>
                    <ListItemText primary="Purchases" />
                </ListItem>
                <ListItem button component={Link} to="/profile">
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;