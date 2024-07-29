<template>
  <div>
    <h1>Dashboard</h1>
    <router-link to="/create-quiz">Create Quiz</router-link>
    <quiz-list />
  </div>
</template>

<script>
import QuizList from '../components/QuizList.vue';

export default {
  name: 'Dashboard',
  components: {
    QuizList
  }
};
</script>
