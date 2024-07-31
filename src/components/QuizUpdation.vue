<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title text-center" style="background-color: rgba(237,237,237,0.46)">Quiz negation</h1>
      <div class="card border-0" style="background-color: rgba(237,237,237,0.46)">
        <div class="card-body">
          <form @submit.prevent="updateQuiz">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input v-model="quiz.title" type="text" id="title" class="form-control" placeholder="Title"/>
              <small v-if="errors.title" class="text-danger">{{ errors.title[0] }}</small>
            </div>
            <div class="mb-3">
              <label for="subject" class="form-label">Subject</label>
              <select v-model="quiz.subject_id" id="subject" class="form-control">
                <option value="">Select a subject</option>
                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
              </select>
              <small v-if="errors.subject_id" class="text-danger">{{ errors.subject_id[0] }}</small>
            </div>
            <button type="submit" class="btn btn-dark">Update Quiz</button>
          </form>
        </div>
      </div>
    </div>
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
      errors: {},
      subjects: []
    };
  },
  methods: {
    async fetchSubjects() {
      const response = await axios.get('/subjects');
      this.subjects = response.data;
    },
    async updateQuiz() {
      try {
        const quizId = this.$route.params.id;
        await axios.put(`/quizzes/${quizId}`, this.quiz);

        this.$router.push('/dashboard');
      }catch (e){
        if (e.response.status === 422) {
          this.errors = e.response.data.errors;
        }
        console.error('Quiz updation failed:', e);
      }

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