// filepath: /Users/ravitejamannam/Course_Connect/frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';  
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import { Box } from '@mui/material';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Courses from './components/Courses';
import CourseForm from './components/admin/CourseForm';

function App() {
    // const [token, setToken] = useState(localStorage.getItem('token'));
    
const {user,setUser} = useAuth();
console.log(user)
    return (
        <Router>
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
                <NavBar user={user} setUser={setUser} />
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
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup  />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/admin/courses/new" element={<CourseForm />} />
                        {/* Other routes */}
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;