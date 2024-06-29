import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const login = (credentials) => api.post('/login', credentials);
export const register = (credentials) => api.post('/register', credentials);
export const addReview = (review) => api.post('/reviews', review, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});
export const getReviews = (breweryId) => api.get(`/reviews/${breweryId}`);
