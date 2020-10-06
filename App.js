import React, {Component} from 'react';
import {Button} from 'react-native';
import AppLogin from './src/components/AppLogin';
import Quiz from './src/components/Quiz';
import {AsyncStorage} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  doLogin = () => {
    this.setLoggedInSttatus(true);
  };

  doLogout = () => {
    this.setLoggedInSttatus(false);
  };

  setLoggedInSttatus(loggedInStatus) {
    this.setState({loggedIn: loggedInStatus});
    this.storeUserState(JSON.stringify(loggedInStatus));
  }

  render() {
    if (!this.state.loggedIn) {
      return <AppLogin letUserIn={this.doLogin} />;
    } else {
      return (
        <>
          <Button title="Logout" onPress={this.doLogout} />
          <Quiz />
        </>
      );
    }
  }

  componentDidMount() {
    this.loadUserState();
  }

  async storeUserState(loggedIn) {
    try {
      await AsyncStorage.setItem('loggedIn', loggedIn);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  async loadUserState() {
    try {
      let loggedInState = await AsyncStorage.getItem('loggedIn');
      let loggedIn = JSON.parse(loggedInState);
      this.setState({loggedIn: loggedIn});
      console.log(loggedIn);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
}
