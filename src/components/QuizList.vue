<template>
  <div>
    <h1>Quizzes</h1>
    <ol class="list-group list-group-numbered">
      <li v-for="quiz in quizzes" :key="quiz.id" class="list-group-item">
        {{ quiz.title }} ({{ quiz.subject.name }})
        <div class="btn-group float-end" role="group" aria-label="Basic example">
          <router-link class="btn btn-success btn-sm text-white float-end" :to="{ name: 'CreateQuestion', params: { id: quiz.id }}">Add Question</router-link>
          <router-link class="btn btn-warning btn-sm text-white float-end" :to="{ name: 'EditQuiz', params: { id: quiz.id } }">Update</router-link>
          <router-link class="btn btn-primary btn-sm text-white float-end" :to="{ name: 'AttendQuiz', params: { id: quiz.id } }">Attend</router-link>
        </div>
      </li>
    </ol>
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
