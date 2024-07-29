<template>
  <div>
    <h1>Results</h1>
    <ul>
      <li v-for="result in results" :key="result.id">
        User: {{ result.user.name }}, Score: {{ result.score }}, Rank: {{ result.rank }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    results() {
      return this.$store.state.results;
    }
  },
  mounted() {
    this.$store.dispatch('fetchResults');
  }
};
</script>
