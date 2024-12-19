import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token'); // Example: adjust as needed
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const signup = async (userData) => {
    try {
        const { data } = await API.post('/user/signup', userData);
        return data;
    } catch (error) {
        console.error('Signup Error:', error.response?.data || error.message);
        throw error;
    }
};

export const signin = (userData) => API.post('/user/signin', userData);
export const getCourses = () => API.get('/course/preview');
export const purchaseCourse = (courseId) => API.post('/course/purchase', { courseId });
export const getPurchases = () => API.get('/user/purchases');
