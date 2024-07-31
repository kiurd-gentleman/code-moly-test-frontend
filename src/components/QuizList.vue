<template>
  <div class="card">
    <div class="card-body">
      <router-link class="btn btn-info btn-sm float-end text-white mt-2 mx-2" to="/create-quiz">Create Quiz</router-link>

      <h1 class="card-title text-center" style="background-color: rgba(237,237,237,0.46)">Quizzes</h1>
      <ol class="list-group list-group-numbered " >
        <li v-for="quiz in quizzes" :key="quiz.id" style="background-color: rgba(237,237,237,0.46)" class="list-group-item border-0 d-flex mt-1 justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ quiz.title }}</div>
            <small>Subject: {{ quiz.subject.name }}</small>
          </div>
          <div class="btn-group float-end mt-2" role="group" aria-label="Basic example">
            <router-link class="btn btn-success btn-sm text-white float-end"
                         :to="{ name: 'CreateQuestion', params: { id: quiz.id }}">Add Question
            </router-link>
            <router-link class="btn btn-warning btn-sm text-white float-end"
                         :to="{ name: 'EditQuiz', params: { id: quiz.id } }">Update
            </router-link>
            <router-link class="btn btn-primary btn-sm text-white float-end"
                         :to="{ name: 'AttendQuiz', params: { id: quiz.id } }">Attend
            </router-link>
          </div>
        </li>
      </ol>
    </div>
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
