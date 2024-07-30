// import Vue from 'vue';
import Vuex from 'vuex';
import auth from '../services/auth';
import quiz from '../services/quiz';
import axios from 'axios';

// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user: {},
        quizzes: [],
        questions: [],
        results: [],
        quiz: {},
    },
    mutations: {
        auth_success(state, {token, user}) {
            state.token = token;
            state.user = user;
        },
        logout(state) {
            state.token = '';
            state.user = {};
        },
        setQuizzes(state, quizzes) {
            state.quizzes = quizzes;
        },
        findQuizById(state, quiz) {
            state.quiz = quiz;
        },
        setQuestions(state, questions) {
            state.questions = questions;
        },
        setResults(state, results) {
            state.results = results;
        }
    },
    actions: {
        async login({commit}, user) {
            const response = await auth.login(user);
            const token = response.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const userInfo = await auth.getUser();
            commit('auth_success', {token, user: userInfo.data});
        },
        async register({commit}, user) {
            const response = await auth.register(user);
            const token = response.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const userInfo = await auth.getUser();
            commit('auth_success', {token, user: userInfo.data});
        },
        async logout({commit}) {
            await auth.logout();
            commit('logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
        async fetchQuizzes({commit}) {
            const response = await quiz.getQuizzes();
            console.log(response.data);
            commit('setQuizzes', response.data);
        },
        async findQuizById(id) {
            const response = await quiz.findQuizById(id);
            // commit('findQuizById', response.data);
            return response.data;
        },
        async fetchQuestions({commit}, quizId) {
            const response = await quiz.getQuestions(quizId);
            commit('setQuestions', response.data);
        },
        async fetchResults({commit}) {
            const response = await quiz.getResults();
            commit('setResults', response.data);
        },
        async submitQuiz({commit}, {quizId, answers}) {
            return quiz.submitQuiz(quizId, answers);
        }
    },
    modules: {}
});
