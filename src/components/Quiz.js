import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Alert, Button} from 'react-native';
import Question from './Question';
import unescape from 'lodash/unescape';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizState: 0, // 0 = Not Started, 1 = in progress, 2 = complete
      questionId: -1,
      quizData: [],
    };
  }

  startQuiz = () => {
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        this.populateQuestions(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  populateQuestions = responseJson => {
    if (responseJson.response_code === 0) {
      let quizData = [];
      responseJson.results.forEach(element => {
        quizData.push(new QuestionItem(element));
      });
      this.setState({
        quizData: quizData,
        quizState: 1,
        questionId: 0,
      });
      console.log('-----------parsed---------');
      console.log(this.state.quizData);
    }
  };

  setQuestionResult = result => {
    this.state.quizData[this.state.questionId].correct = result;
    console.log('-----------result---------');
    console.log(this.state.quizData);
  };

  continueQuiz = () => {
    console.log('-----------continue---------');
    console.log(this.state.quizData);
    /*if (this.state.questionId < this.state.quizData.length - 1) {
      this.setState({questionId: this.state.question + 1});
    }*/
  };

  render() {
    if (this.state.quizState === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Welcome to My Quiz App</Text>
          <Button title="Start Quiz" onPress={this.startQuiz} />
        </View>
      );
    } else if (this.state.quizState === 1) {
      return (
        <View style={styles.container}>
          <Question
            questionItem={this.state.quizData[this.state.questionId]}
            continueAction={this.continueQuiz}
            setResultAction={this.setQuestionResult}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightyellow',
  },
  text: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

class QuestionItem {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  correct: Boolean;

  constructor(element) {
    this.category = unescape(element.category);
    this.question = unescape(element.question);
    this.correct_answer = unescape(element.correct_answer);
    this.incorrect_answers = [];
    element.incorrect_answers.forEach(e => {
      this.incorrect_answers.push(unescape(e));
    });
    this.correct = false;
  }
}
