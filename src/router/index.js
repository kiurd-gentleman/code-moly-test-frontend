// import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import CreateQuiz from '../views/CreateQuiz.vue';
import AttendQuiz from '../views/AttendQuiz.vue';
import Results from '../views/Results.vue';

// Vue.use(VueRouter);

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/create-quiz', name: 'CreateQuiz', component: CreateQuiz },
    { path: '/attend-quiz', name: 'AttendQuiz', component: AttendQuiz },
    { path: '/results', name: 'Results', component: Results },
    // { path: '*', redirect: '/login' }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

// const router = new VueRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes
// });

export default router;
