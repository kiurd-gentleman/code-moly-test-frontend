<template>
  <div class="card">
    <div class="card-body">
      <ol class="list-group list-group-numbered">
        <li v-for="question in questions" :key="question.id" class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ question.question_text }}</div>
            <ul>
              <li v-for="(option, index) in question.options" :key="index">
                {{ option.option_text }} - {{ option.is_correct ? 'Correct' : 'Incorrect' }}
              </li>
            </ul>
            <small>Correct: {{ question.correct_answer }} - Score: {{ question.score }} - Negative: {{ question.negative_mark }}</small>
          </div>
          <button class="btn btn-sm btn-danger" @click.prevent="deleteQuestion(question.id)">Delete</button>
        </li>
      </ol>

      <div class="mt-5">
        <h5>Add Questions</h5>
        <form @submit.prevent="addQuestion">
          <div class="mb-3">
            <label for="question_test" class="form-label">Question Test</label>
            <input type="text" v-model="questionText" class="form-control" id="question_test"
                   placeholder="Question Text"/>
          </div>
          <!--          // dynamic option create -->
          <div class="mb-3">
            <label for="correct_answer" class="form-label">Option</label>
            <ul class="list-group">
              <!--              <li class="list-group-item">-->
              <!--                <div class="input-group mb-3">-->
              <!--                  <input type="text" v-model="correctAnswer" id="option" class="form-control"/>-->
              <!--                </div>-->
              <!--              </li>-->
              <li v-for="(option, index) in options" :key="index" class="list-group-item">
                <div class="input-group mb-3">
                  <input type="text" v-model="option.text" class="form-control">
                  <div class="input-group-text">
                    <input type="radio" v-model="option.is_correct" :value="index">
                  </div>
                  <button class="btn btn-sm btn-danger" @click.prevent="removeOption(index)">X</button>
                </div>
              </li>
            </ul>
            <button class="btn btn-dark btn-sm mt-1" @click.prevent="addOption">Add More</button>
          </div>
          <div class="mb-3">
            <label for="correct_answer" class="form-label">Correct Answer</label>
            <input type="number" v-model.number="correctAnswer" id="correct_answer" class="form-control" placeholder="Correct Answer"/>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="score" class="form-label">Score</label>
              <input v-model.number="score" type="number" class="form-control" placeholder="Score"/>
            </div>
            <div class="col-md-6 mb-3">
              <label for="negativeMark" class="form-label">Score</label>
              <input v-model.number="negativeMark" type="number" class="form-control" placeholder="Negative Mark"/>
            </div>
          </div>
          <button type="submit" class="btn btn-sm btn-dark">Add Question</button>
        </form>
      </div>
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
      questions: [],
      options: [{
        text: '',
        is_correct: false
      },
      ]
    };
  },
  methods: {
    addOption() {
      this.options.push({text: '', is_correct: false});
    },
    removeOption(index) {
      this.options.splice(index, 1);
    },
    async deleteQuestion(questionId) {
      try {
        await axios.delete(`/questions/${questionId}`);
        this.questions = this.questions.filter(question => question.id !== questionId);
      } catch (error) {
        console.error('Failed to delete question:', error);
      }
    },
    async addQuestion() {
      const quizId = this.$route.params.id; // Assuming quiz ID is passed via route params
      const newQuestion = {
        quiz_id: quizId,
        question_text: this.questionText,
        correct_answer: this.correctAnswer,
        score: this.score,
        negative_mark: this.negativeMark,
        options : this.options
      };

      try {
        const response = await axios.post(`/quizzes/${quizId}/questions`, newQuestion);
        this.questions.push(response.data);
        this.questionText = '';
        this.correctAnswer = '';
        this.score = 1;
        this.negativeMark = 0;
        this.options = [{
          text: '',
          is_correct: false
        }];
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