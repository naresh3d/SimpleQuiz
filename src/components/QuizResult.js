import React, {Component} from 'react';

import {StyleSheet, View, Text, ScrollView} from 'react-native';

export default class QuizResult extends Component {
  render() {
    let answers = [];
    let correctCount = 0;
    this.props.quizData.forEach((element, i) => {
      answers.push(
        <Text key={i} style={styles.answer}>
          Question # {i + 1} : {element.question} ==={' '}
          {element.correct ? 'CORRECT' : 'WRONG'}
        </Text>,
      );
      if (element.correct) {
        correctCount++;
      }
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          {answers}
          <Text style={styles.text}>
            SCORE : {correctCount} / {this.props.quizData.length}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightyellow',
  },
  answer: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
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
