import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import firestore, { firebase } from '@react-native-firebase/firestore';

const extractKey = ({ id }) => id

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            nome: '',
            telefone: '',
        }
        this.getInfos = this.getInfos.bind(this)
        this.enviar = this.enviar.bind(this)
    }

    componentDidMount() {
        this.getInfos();
    }

    enviar() {
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: this.state.nome,
        })
        .then(()=>alert('Informações atualizadas com sucesso!'))
        .catch(()=>alert('Erro ao atualizar informações'))
            
    }

    getInfos(){
            var user = firebase.auth().currentUser;
            var phoneNumber, displayName;
            //var name, email, photoUrl, uid, emailVerified;

            if (user != null) {
                if(user.displayName != null){
                    this.setState({
                        nome: user.displayName,
                    });
                }
                this.setState({
                    telefone: user.phoneNumber,
                }); 
            }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.tituloPag}>MEUS DADOS</Text>
                <Text style={styles.infos}>Telefone: </Text>
                <Text style={styles.tele}>{this.state.telefone}</Text>
                <Text style={styles.infos}>Nome:</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(nome) => this.setState({ nome })}
                    ref={(input) => this.nome = input}
                    defaultValue = {this.state.nome}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.enviar}>Enviar</Text>
                </TouchableOpacity>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        alignItems: 'center'
    },
    inputBox: {
        width: 200,
        backgroundColor: '#eeeeee',
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10,
        textAlign: "center"
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    tituloPag: {
        textAlign: 'center',
        fontSize: 25,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 30,
        paddingHorizontal: 40,
        fontWeight: "bold",
    },
    infos :{
        textAlign: 'left',
        fontSize: 20,
        marginLeft: 15

    },
    tele:{
        fontSize: 25,
        marginBottom: 15,
    }
});