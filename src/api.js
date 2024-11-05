import axios from 'axios';

export const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            return { success: true, token: response.data.token }; // Return the token as well
        }
    } catch (error) {
        return { success: false, message: error.response?.data.message || "Login failed" };
    }
};

export const getProducts = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:5000/api/inventory', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
};
