import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
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
        console.log('Attempting signup with:', { email: userData.email }); // Debug log
        const response = await API.post('/user/signup', userData);
        console.log('Signup response:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('Signup Error:', error.response?.data || error.message);
        throw error;
    }
};

export const signin = async (userData) => {
    try {
        console.log('Attempting signin with:', { email: userData.email }); // Debug log
        const response = await API.post('/user/signin', userData);
        console.log('Signin response:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('Signin Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getCourses = async () => {
    try {
        const { data } = await API.get('/course/preview');
        return data;
    } catch (error) {
        console.error('Get Courses Error:', error.response?.data || error.message);
        throw error;
    }
};

export const purchaseCourse = async (courseId) => {
    try {
        const { data } = await API.post('/course/purchase', { courseId });
        return data;
    } catch (error) {
        console.error('Purchase Course Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getPurchases = async (token) => {
    try {
        const { data } = await API.get('/user/purchases',{
            headers: {
                Authorization: `Bearer ${token}`,}
            });
        
        return data;
    } catch (error) {
        console.error('Get Purchases Error:', error.response?.data || error.message);
        throw error;
    }
};