<template>
  <div class="card">
    <div class="card-body">
      <h2>Add Questions</h2>
      <form @submit.prevent="addQuestion">
        <input v-model="questionText" placeholder="Question Text"/>
        <input v-model="correctAnswer" placeholder="Correct Answer"/>
        <input v-model.number="score" type="number" placeholder="Score"/>
        <input v-model.number="negativeMark" type="number" placeholder="Negative Mark"/>
        <button type="submit">Add Question</button>
      </form>
      <ul>
        <li v-for="question in questions" :key="question.id">
          {{ question.question_text }} - Correct: {{ question.correct_answer }} - Score: {{ question.score }} -
          Negative: {{ question.negative_mark }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      questionText: '',
      correctAnswer: '',
      score: 1,
      negativeMark: 0,
      questions: []
    };
  },
  methods: {
    async addQuestion() {
      const quizId = this.$route.params.id; // Assuming quiz ID is passed via route params
      const newQuestion = {
        quiz_id: quizId,
        question_text: this.questionText,
        correct_answer: this.correctAnswer,
        score: this.score,
        negative_mark: this.negativeMark
      };

      try {
        const response = await axios.post(`/quizzes/${quizId}/questions`, newQuestion);
        this.questions.push(response.data);
        this.questionText = '';
        this.correctAnswer = '';
        this.score = 1;
        this.negativeMark = 0;
      } catch (error) {
        console.error('Failed to add question:', error);
      }
    }
  },
  async mounted() {
    const quizId = this.$route.params.id;
    const response = await axios.get(`/quizzes/${quizId}/questions`);
    this.questions = response.data;
  }
};
</script>
