
<template>
  <div class="card">
    <div class="card-body">
    <h1>Quiz negation</h1>
      <form @submit.prevent="updateQuiz">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input v-model="quiz.title" type="text" id="title" class="form-control" placeholder="Title"/>
        </div>
        <div class="mb-3">
          <label for="subject" class="form-label">Subject</label>
          <select v-model="quiz.subject_id" id="subject" class="form-control">
            <option value="">Select a subject</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-dark">Update Quiz</button>
      </form>
    </div>
  </div>

</template>

<script >
import axios from 'axios';
export default {
  data() {
    return {
      quiz: {
        title: '',
        subject_id: ''
      },
      subjects: []
    };
  },
  methods: {
    async fetchSubjects() {
      const response = await axios.get('/subjects');
      this.subjects = response.data;
    },
    async updateQuiz() {
      const quizId = this.$route.params.id;
      await axios.put(`/quizzes/${quizId}`, this.quiz);

      this.$router.push('/dashboard');
    },
    async fetchQuiz() {
      const quizId = this.$route.params.id;
      const response = await axios.get(`/quizzes/${quizId}`);
      this.quiz = response.data;
    }
  },
  mounted() {
    this.fetchSubjects();
    this.fetchQuiz();
  }
};

</script>


<style scoped>

</style>