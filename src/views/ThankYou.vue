<script>
export default {
  name: 'ThankYou',
  props:{
    result: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      score: 30,
      total: 50,
      negativeMark: 20,
      feedbackMessage: ''
    };
  },
  methods: {
    setFeedbackMessage() {
      if ((this.result.score * this.result.total_score) /100 >= 90) {
        this.feedbackMessage = 'Excellent performance! Keep up the great work!';
      } else if ((this.result.score * this.result.total_score) /100 >= 70) {
        this.feedbackMessage = 'Good job! There is room for improvement, but you are doing great!';
      } else {
        this.feedbackMessage = 'Keep practicing! You have the potential to do much better.';
      }
    },
  }, mounted() {
    this.setFeedbackMessage();
  }
};

</script>

<template>
  <div class="container mt-5">
    <div class="bg-light p-5 rounded">
      <h1>Thank You for participating</h1>
      <p class="lead">{{ feedbackMessage }} </p>
      <p>Your Score is ({{ result.score <0 ? 0 : result.score }}) of {{ result.total_score }}. Negative mark is {{ result.negative_score }}</p>
      <a class="btn btn-lg btn-primary" href="/dashboard" role="button">Go to Dashboard</a>
    </div>
  </div>

</template>

<style>

</style>