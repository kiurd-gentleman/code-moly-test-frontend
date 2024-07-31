<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title text-center" style="background-color: rgba(237,237,237,0.46)">Add Question</h1>
      <ol class="list-group list-group-numbered">
        <li v-for="question in questions" style="background-color: rgba(237,237,237,0.46)" :key="question.id" class="list-group-item d-flex border-0 justify-content-between mt-1 align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ question.question_text }}</div>
            <ul>
              <li v-for="(option, index) in question.options" :key="index">
                {{ option.option_text }}
                <span v-if="option.is_correct" style="color: green">&#10003;</span>
                <span v-else style="color: red">&#10540;</span>
<!--                {{ // option.is_correct ? 'Correct &#10003;' : 'Incorrect &#10540; ;' }}-->
              </li>
            </ul>
            <small class="mt-5">Correct: {{ question.correct_answer }} - Score: {{ question.score }} - Negative: {{ question.negative_mark }}</small>
          </div>
          <button class="btn btn-sm btn-danger" @click.prevent="deleteQuestion(question.id)">Delete</button>
        </li>
      </ol>

      <div class="mt-5">
        <h5 class="text-center">Add Questions</h5>
        <div class="card border-0" style="background-color: rgba(237,237,237,0.46)">
          <div class="card-body">
            <form @submit.prevent="addQuestion">
              <div class="mb-3">
                <label for="question_test" class="form-label">Question Test</label>
                <input type="text" v-model="questionText" class="form-control" id="question_test"
                       placeholder="Question Text"/>
                <small v-if="errors.question_text" class="text-danger">{{ errors.question_text[0] }}</small>
              </div>
              <div class="mb-3">
                <label for="correct_answer" class="form-label">Option</label>
                <ul class="list-group" >
                  <li v-for="(option, index) in options" :key="index" class="list-group-item border-0">
                    <div class="input-group mb-3 mt-2">
                      <input type="text" v-model="option.text" class="form-control ">
                      <div class="input-group-text">
                        <input type="radio" name="is_correct" :value="index" @change="setCorrectOption(index)">
                      </div>
                      <button class="btn btn-sm btn-danger" @click.prevent="removeOption(index)">X</button>
                    </div>
                    <small v-if="errors['options.' + index + '.text']" class="text-danger">{{ errors['options.' + index + '.text'][0] }}</small>
                  </li>
                </ul>
                <button class="btn btn-dark btn-sm mt-3" @click.prevent="addOption">Add More</button>
                <small v-if="errors.options" class="text-danger">{{ errors.options[0] }}</small>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="score" class="form-label">Score</label>
                  <input v-model.number="score" type="number" class="form-control" placeholder="Score"/>
                  <small v-if="errors.score" class="text-danger">{{ errors.score[0] }}</small>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="negativeMark" class="form-label">Negative Score</label>
                  <input v-model.number="negativeMark" type="number" class="form-control"/>
                  <small v-if="errors.negative_mark" class="text-danger">{{ errors.negative_mark[0] }}</small>
                </div>
              </div>
              <button type="submit" class="btn btn-sm btn-dark">Add Question</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      errors: [],
      questionText: '',
      correctAnswer: '',
      score: 0,
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
    setCorrectOption(index) {
      this.options.forEach((option, i) => {
        option.is_correct = i === index;
      });
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
        this.score = 0;
        this.negativeMark = 0;
        this.options = [{
          text: '',
          is_correct: false
        }];
      } catch (error) {
        this.errors = error.response.data.errors;
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
