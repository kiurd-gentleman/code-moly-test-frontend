<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1>Quiz Attendance</h1>
        <div v-for="(question, index) in questions" :key="question.id">
          <h2>{{ question.question_text }}</h2>
          <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
            <input type="radio" :name="`question-${index}`" :value="option.id" v-model="userAnswers[question.id]">
            <label>{{ option.option_text }}</label>
          </div>
        </div>
        <button @click="submitAnswers">Submit Answers</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAnswers: {}
    };
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  methods: {
    async submitAnswers() {
      const quizId = this.$route.params.id;
      const answers = Object.entries(this.userAnswers).map(([questionId, answer]) => ({
        question: questionId,
        answer
      }));
      await this.$store.dispatch('submitQuiz', { quizId, answers });
    }
  },
  mounted() {
    const quizId = this.$route.params.id;
    this.$store.dispatch('fetchQuestions', quizId);
  }
};
</script>
