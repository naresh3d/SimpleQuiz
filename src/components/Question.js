import React, {Component} from 'react';

import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicator: '',
    };

    this.selectOption = this.selectOption.bind(this);
  }

  selectOption = param => {
    console.log(param.index);
    if (this.state.indicator === '') {
      if (
        this.props.questionItem.all_answers[param.index] ===
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

  handleContinueClick = () => {
    this.setState({indicator: ''});
    this.props.continueAction();
  };

  render() {
    let optionButtons = [];
    this.props.questionItem.all_answers.forEach((element, index) => {
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
          <Button title="Continue" onPress={this.handleContinueClick} />
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
