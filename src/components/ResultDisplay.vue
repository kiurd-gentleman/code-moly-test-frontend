<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title text-center" style="background-color: rgba(237,237,237,0.46)">Results</h1>
<!--      <h5 class="card-title">Card title</h5>-->
      <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start border-0 mt-1" v-for="result in results" :key="result.id" style="background-color: rgba(237,237,237,0.46)">
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ result.user }}</div>
            Rank: {{ result.rank }}
          </div>
          <span class="badge bg-dark-subtle rounded-pill mt-3 text-dark">Score: {{ result.score }}</span>
        </li>
      </ol>
    </div>
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
