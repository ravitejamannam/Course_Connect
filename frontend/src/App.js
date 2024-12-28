// filepath: /Users/ravitejamannam/Course_Connect/frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import { Box } from '@mui/material';
import Home from './components/Home';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
                <NavBar token={token} setToken={setToken} />
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: '64px', // Height of navbar
                        ml: '240px', // Width of sidebar
                        bgcolor: '#F5F7F9', // Light gray background
                        minHeight: '100vh'
                    }}
                >
                    <Routes>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Home />} />
                        {/* Other routes */}
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;