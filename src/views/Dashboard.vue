<template>
  <div class="container mx-auto">
    <div class="mt-5 w-50 mx-auto">
      <h1>Dashboard</h1>
      <quiz-list/>
    </div>
  </div>
</template>
<script>
import QuizList from '../components/QuizList.vue';

export default {
  name: 'Dashboard',
  components: {
    QuizList
  }
};
</script>
