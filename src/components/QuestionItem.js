import unescape from 'lodash/unescape';

export default class QuestionItem {
  category: string;
  question: string;
  correct_answer: string;
  all_answers: string[];
  correct: Boolean;

  constructor(element) {
    this.category = unescape(element.category);
    this.question = unescape(element.question);
    this.correct_answer = unescape(element.correct_answer);
    let incorrect_answers = [];
    element.incorrect_answers.forEach(e => {
      incorrect_answers.push(unescape(e));
    });

    let incorrectCount = incorrect_answers.length;
    let randomIndex = Math.floor(Math.random() * (incorrectCount + 1));
    this.all_answers = incorrect_answers.slice();
    this.all_answers.splice(randomIndex, 0, this.correct_answer);
    this.correct = false;
  }
}
