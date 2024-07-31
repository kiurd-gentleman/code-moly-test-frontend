<template>
  <div class="container mx-auto">
    <div class="mt-5 w-50 mx-auto">
      <quiz-attendance/>
    </div>
  </div>
</template>

<script>
import QuizAttendance from '../components/QuizAttendance.vue';

export default {
  name: 'AttendQuiz',
  components: {
    QuizAttendance
  }
};
</script>
