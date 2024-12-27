import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CourseList from './components/CourseList';
import Purchase from './components/Purchase';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './components/Home';





const drawerWidth = 240;

const RoutesComponent = () => {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <CssBaseline />
            <NavBar />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Sidebar />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            transition: 'width 0.3s',
                        }}
                    >
                        <Toolbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/signin" element={<Signin setToken={setToken} />} />
                            <Route path="/courses" element={<CourseList token={token} />} />
                            <Route path="/purchases" element={<Purchase token={token} />} />
                        </Routes>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </Router>
    );
};

export default RoutesComponent;