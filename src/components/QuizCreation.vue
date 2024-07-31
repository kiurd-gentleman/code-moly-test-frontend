<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title text-center" style="background-color: rgba(237,237,237,0.46)">Create Quiz</h1>
      <div class="card border-0" style="background-color: rgba(237,237,237,0.46)">
        <div class="card-body">
          <form @submit.prevent="createQuiz">
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
            <button type="submit" class="btn btn-dark">Create Quiz</button>
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
      subjects: [],
      errors: {}
    };
  },
  methods: {
    async fetchSubjects() {
      const response = await axios.get('/subjects');
      this.subjects = response.data;
    },
    async createQuiz() {
      try {
        await axios.post('/quizzes', this.quiz);
        this.$router.push('/dashboard');
      }catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
        console.error('Registration failed:', error);
      }
    }
  },
  mounted() {
    this.fetchSubjects();
  }
};
</script>
