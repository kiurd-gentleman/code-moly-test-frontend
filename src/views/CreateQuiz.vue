<template>
  <div class="container mx-auto">
    <div class="mt-5 w-50 mx-auto">
      <h1>Create Quiz</h1>
      <quiz-creation/>
    </div>
  </div>
</template>

<script>
import QuizCreation from '../components/QuizCreation.vue';
// import QuestionCreation from '../components/QuestionCreation.vue';

export default {
  name: 'CreateQuiz',
  components: {
    QuizCreation,
    // QuestionCreation
  }
};
</script>
