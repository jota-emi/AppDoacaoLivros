import React, { Component } from 'react';
import { View, Button, Text, TextInput } from 'react-native';

import auth from '@react-native-firebase/auth';

export default class PhoneAuthTest extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      message: '',
      codeInput: '',
      phoneNumber: '+55',
      confirmResult: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('MenuPrincipal')
      } else {
        // User has been signed out, reset the state
        this.ready = true
        this.setState({
          ready: true,
          message: '',
          codeInput: '',
          phoneNumber: '+55',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Enviando o código...' });

    auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'O código foi enviado!' }))
      .catch(error => this.setState({ message: `Um erro ocorreu: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Código Confirmado' });
        })
        .catch(error => this.setState({ message: `Código errado: ${error.message}` }));
    }
  };

  signOut = () => {
    auth().signOut();
  }

  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <Text>Digite o número de seu telefone:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Telefone ... '}
          value={phoneNumber}
        />
        <Button title="Entrar" color="green" onPress={this.signIn} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Digite o código de verificação:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Codigo ... '}
          value={codeInput}
        />
        <Button title="Confirmar" color="grey" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { confirmResult } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'skyblue'}}>

        {this.state.ready && !confirmResult && this.renderPhoneNumberInput()}

        {this.state.ready && this.renderMessage()}

        {this.state.ready && confirmResult && this.renderVerificationCodeInput()}

      </View>
    );
  }
}