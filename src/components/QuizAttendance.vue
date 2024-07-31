<template>
  <div class="container">
    <div class="card" v-if="!isShowThankYouPage">
      <div class="card-body">
        <h1 class="text-center" style="background-color: rgba(237,237,237,0.46)">Quiz Attendance</h1>
        <div v-for="(question, index) in questions" :key="question.id" class="card mt-3 border-0" style="background-color: rgba(237,237,237,0.46)">
          <div class="card-body">
            <h4 class="card-title">Q: {{ question.question_text }}</h4>
            <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="form-check">
              <input type="radio" class="form-check-input" :name="`question-${index}`" :value="option.id" v-model="userAnswers[question.id]">
              <label class="form-check-label" for="flexCheckDefault">
                {{ option.option_text }}
              </label>
            </div>
          </div>
        </div>
        <button class="btn btn-sm btn-dark mt-3" @click="submitAnswers">Submit Answers</button>
      </div>
    </div>
    <thank-you :result="result" v-if="isShowThankYouPage"></thank-you>
  </div>
</template>

<script>
import ThankYou from "@/views/ThankYou.vue"

export default {
  components: {
    ThankYou
  },
  data() {
    return {
      isShowThankYouPage: false,
      userAnswers: {},
      errors: {},
      result: {}
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
      try {
        const response = await this.$store.dispatch('submitQuiz', {quizId, answers});
        this.result = response.data
        this.isShowThankYouPage = true
        // this.$router.push('/thank-you')
      } catch (e) {
        //validation error handling
        this.errors = e.response.data.errors
      }

    }
  },
  mounted() {
    const quizId = this.$route.params.id;
    this.$store.dispatch('fetchQuestions', quizId);
  }
};
</script>
