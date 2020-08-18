import React, {Component} from 'react';
import {Button} from 'react-native';
import AppLogin from './src/components/AppLogin';
import Quiz from './src/components/Quiz';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  doLogin = () => {
    this.setState({loggedIn: true});
  };

  doLogout = () => {
    this.setState({loggedIn: false});
  };

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
}
