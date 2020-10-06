import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Question from './Question';
import QuizResult from './QuizResult';
import QuestionItem from './QuestionItem';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizState: 0, // 0 = Not Started, 1 = in progress, 2 = complete
      questionId: -1,
      quizData: [],
      startQuizClicked: false,
    };
  }

  startQuiz = () => {
    this.setState({startQuizClicked: true});
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
    }
  };

  setQuestionResult = result => {
    this.state.quizData[this.state.questionId].correct = result;
  };

  continueQuiz = () => {
    if (this.state.questionId < this.state.quizData.length - 1) {
      this.setState({questionId: this.state.questionId + 1});
    } else {
      this.setState({quizState: 2, startQuizClicked: false});
    }
  };

  render() {
    if (this.state.quizState === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Welcome to My Quiz App</Text>
          <Button
            title="Start Quiz"
            onPress={this.startQuiz}
            disabled={this.state.startQuizClicked}
          />
        </View>
      );
    } else if (this.state.quizState === 1) {
      return (
        <View style={styles.container}>
          <Question
            questionItem={this.state.quizData[this.state.questionId]}
            setResultAction={this.setQuestionResult}
            continueAction={this.continueQuiz}
          />
        </View>
      );
    } else if (this.state.quizState === 2) {
      return (
        <View style={styles.container}>
          <QuizResult quizData={this.state.quizData} />
          <Button
            title="Play Again"
            onPress={this.startQuiz}
            disabled={this.state.startQuizClicked}
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
