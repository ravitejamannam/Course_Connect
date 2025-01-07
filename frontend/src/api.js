import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const signup = async (userData) => {
    try {
        console.log('Attempting signup with:', userData);
        const response = await API.post('/user/signup', userData);
        
        // Store token immediately after successful signup
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        
        console.log('Signup successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Signup Error:', error.response?.data || error);
        throw error;
    }
};

export const signin = async (userData) => {
    try {
        const response = await API.post('/user/signin', userData);
        // Store token immediately after successful signin
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Signin Error:', error.response?.data || error);
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

export const getProfile = async () => {
    try {
        const response = await API.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error('Profile fetch error:', error.response?.data || error);
        throw error;
    }
};

export const updateProfile = async (userData) => {
    try {
        const response = await API.put('/user/profile', userData);
        return response.data;
    } catch (error) {
        console.error('Profile update error:', error.response?.data || error);
        throw error;
    }
};