import axios from 'axios';

export default {
    getQuizzes() {
        return axios.get('/quizzes');
    },
    getQuestions(quizId) {
        return axios.get(`/quizzes/${quizId}/questions`);
    },
    getResults() {
        return axios.get('/results');
    }
};
