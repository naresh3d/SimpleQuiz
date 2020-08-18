import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Alert, Button} from 'react-native';

export default class AppLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'adminUser',
      password: '12345678',
    };
  }

  onLogin() {
    const {username, password} = this.state;
    if (username === 'adminUser' && password === '12345678') {
      this.props.letUserIn();
    } else {
      Alert.alert('Invalid Credentials');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>My Quiz App</Text>
        <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({username})}
          label="Email"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          label="Password"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
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
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: 'white',
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
