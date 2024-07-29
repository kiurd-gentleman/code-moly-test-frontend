<template>
  <div>
    <h1>Create Quiz</h1>
    <form @submit.prevent="createQuiz">
      <input v-model="quiz.title" placeholder="Quiz Title" />
      <select v-model="quiz.subject_id">
        <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
          {{ subject.name }}
        </option>
      </select>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
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
    async createQuiz() {
      await axios.post('/quizzes', this.quiz);
      this.$router.push('/dashboard');
    }
  },
  mounted() {
    this.fetchSubjects();
  }
};
</script>
