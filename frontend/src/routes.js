// filepath: /Users/ravitejamannam/Course_Connect/frontend/src/routes.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CourseList from './components/CourseList';
import Purchase from './components/Purchase';

const RoutesComponent = () => {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin setToken={setToken} />} />
                <Route path="/courses" element={<CourseList token={token} />} />
                <Route path="/purchases" element={<Purchase token={token} />} />
            </Routes>
        </Router>
    );
};

export default RoutesComponent;