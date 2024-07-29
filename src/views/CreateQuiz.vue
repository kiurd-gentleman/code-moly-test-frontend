<template>
  <div>
    <h1>Create Quiz</h1>
    <quiz-creation />
    <question-creation />
  </div>
</template>

<script>
import QuizCreation from '../components/QuizCreation.vue';
import QuestionCreation from '../components/QuestionCreation.vue';

export default {
  name: 'CreateQuiz',
  components: {
    QuizCreation,
    QuestionCreation
  }
};
</script>
