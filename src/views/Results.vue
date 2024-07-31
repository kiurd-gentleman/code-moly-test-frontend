<template>
  <div class="container mx-auto">
    <div class="mt-5 w-50 mx-auto">
      <result-display/>
    </div>
  </div>
</template>

<script>
import ResultDisplay from '../components/ResultDisplay.vue';

export default {
  name: 'Results',
  components: {
    ResultDisplay
  }
};
</script>
