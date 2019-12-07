import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


import firestore, { firebase } from '@react-native-firebase/firestore';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            titulo:'',
            autor: '',
            preco: 0
        }
        this.cadastrar = this.cadastrar.bind(this)
    }

    componentDidMount() {
    }

    cadastrar() {
        var user = firebase.auth().currentUser;

        firestore().collection("livros").add({
            titulo: this.state.titulo,
            autor: this.state.autor,
            preco: this.state.preco,
            dono: user.displayName,
            telDono: user.phoneNumber
        })
        .then(()=>alert('Livro cadastrado com sucesso'))
        .catch(()=>alert('Erro ao cadastrar livro'))
            
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.tituloCad}>CADASTRAR NOVO LIVRO</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(titulo) => this.setState({ titulo })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Título"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    onSubmitEditing={() => this.autor.focus()} />

                <TextInput style={styles.inputBox}
                    onChangeText={(autor) => this.setState({ autor })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Autor"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    ref={(input) => this.autor = input}
                />
                <TextInput style={styles.inputBox}
                    onChangeText={(preco) => this.setState({ preco })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Preço"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType={'numeric'}
                    ref={(input) => this.preco = parseFloat(input)}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.cadastrar}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
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
    tituloCad: {
        textAlign: 'center',
        fontSize: 25,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 30,
        paddingHorizontal: 40,
        fontWeight: "bold",        
    }
});