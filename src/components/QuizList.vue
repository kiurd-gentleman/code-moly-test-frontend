<template>
  <div>
    <h1>Quizzes</h1>
    <ul>
      <li v-for="quiz in quizzes" :key="quiz.id">
        {{ quiz.title }} ({{ quiz.subject.name }})
        <router-link :to="{ name: 'AttendQuiz', params: { id: quiz.id } }">Attend</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    quizzes() {
      return this.$store.state.quizzes;
    }
  },
  mounted() {
    this.$store.dispatch('fetchQuizzes');
  }
};
</script>
