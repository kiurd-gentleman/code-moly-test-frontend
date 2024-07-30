<template>
    <div>
        <h1>Attend Quiz</h1>
        <div v-for="(question, index) in questions" :key="question.id">
        <p>{{ index + 1 }}. {{ question.question_text }}</p>
        <input type="text" v-model="userAnswers[question.id]" />
    </div>
    <button @click="submitAnswers">Submit</button>
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

    // Handle answer submission logic here
}
},
    mounted() {
    const quizId = this.$route.params.id;
    this.$store.dispatch('fetchQuestions', quizId);
}
};
</script>
