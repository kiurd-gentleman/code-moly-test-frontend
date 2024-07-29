import axios from 'axios';

export default {
    login(user) {
        return axios.post('/login', user);
    },
    register(user) {
        return axios.post('/register', user);
    },
    getUser() {
        return axios.get('/user');
    },
    logout() {
        return axios.post('/logout');
    }
};
