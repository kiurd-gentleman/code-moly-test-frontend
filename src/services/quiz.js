import axios from 'axios';

export default {
    getQuizzes() {
        return axios.get('/quizzes');
    },
    findQuizById(quizId) {
        return axios.get(`/quizzes/${quizId}`);
    },
    getQuestions(quizId) {
        return axios.get(`/quizzes/${quizId}/questions`);
    },
    getResults() {
        return axios.get('/results');
    }
};
