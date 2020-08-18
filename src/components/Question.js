import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class Question extends Component {
  constructor(props) {
    super(props);
    console.log('=========Props===========');
    console.log(props);

    this.state = {
      mergedQuestions: null,
      indicator: '',
    };

    let incorrectCount = this.props.questionItem.incorrect_answers.length;
    let randomIndex = Math.floor(Math.random() * (incorrectCount + 1));
    let mergedQuestions = this.props.questionItem.incorrect_answers.slice();
    mergedQuestions.splice(
      randomIndex,
      0,
      this.props.questionItem.correct_answer,
    );
    console.log('--------------------------------');
    console.log(mergedQuestions);
    this.state.mergedQuestions = mergedQuestions;

    this.selectOption = this.selectOption.bind(this);
  }

  selectOption = param => {
    console.log(param.index);
    if (this.state.indicator === '') {
      if (
        this.state.mergedQuestions[param.index] ===
        this.props.questionItem.correct_answer
      ) {
        this.state.correct = true;
        this.setState({indicator: 'CORRECT'});
      } else {
        this.state.correct = false;
        this.setState({indicator: 'WRONG'});
      }
      this.props.setResultAction(this.state.correct);
    }
  };

  render() {
    let optionButtons = [];
    this.state.mergedQuestions.forEach((element, index) => {
      optionButtons.push(
        <>
          <TouchableOpacity
            style={styles.touchButton}
            key={index}
            onPress={() => this.selectOption({index})}
            disabled={this.state.indicator !== ''}>
            <Text>{element}</Text>
          </TouchableOpacity>
        </>,
      );
    });
    return (
      <View>
        <Text style={styles.text}>{this.props.questionItem.question}</Text>
        {optionButtons}
        <Text style={styles.text}>{this.state.indicator}</Text>
        {this.state.indicator !== '' && (
          <Button title="Continue" onPress={this.props.continueAction} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderColor: 'black',
    marginBottom: 10,
  },
  optionButton: {
    marginVertical: 10,
  },
  touchButton: {
    backgroundColor: 'white',
    margin: 10,
    minHeight: 30,
    borderColor: 'grey',
    borderWidth: 1,
    textAlignVertical: 'center',
  },
});
