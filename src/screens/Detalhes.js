import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableHighlight, Stack, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import firestore, {firebase} from '@react-native-firebase/firestore';

const extractKey = ({ id }) => id

export default class Detalhes extends Component {
    constructor(props) {
        super(props)
        
        this.deletar = this.deletar.bind(this)
    }

    componentDidMount() {
    }

    EhDono(){
        var user = firebase.auth().currentUser;
        if(user.phoneNumber == this.props.navigation.state.params.Book.telDono){
               return true;        
        }
        return false;
    }

    deletar() {
        firestore().collection('livros').doc(this.props.navigation.state.params.Book.id).delete()
        .then(()=>
        alert('Cadastro excluído com sucesso'),
        this.props.navigation.navigate('Home'))
        .catch(()=>alert('Erro ao excluir livro'))           
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.tituloDet}>Detalhes</Text>
                <Text style={styles.infos}>Titulo:</Text>
                <Text style={styles.tele}>{this.props.navigation.state.params.Book.titulo}</Text>
                <Text style={styles.infos}>Autor(a):</Text>
                <Text style={styles.tele}>{this.props.navigation.state.params.Book.autor}</Text>
                <Text style={styles.infos}>Preco:</Text>
                <Text style={styles.tele}>{this.props.navigation.state.params.Book.preco}</Text>
                <Text style={styles.infos}>Nome do doador/vendedor:</Text>
                <Text style={styles.tele}>{this.props.navigation.state.params.Book.dono}</Text>
                <Text style={styles.infos}>Contato:</Text>
                <Text style={styles.tele}>{this.props.navigation.state.params.Book.telDono}</Text>

                {this.EhDono() ?  
                    <TouchableOpacity style={styles.button} onPress={this.deletar} >
                    <Text style={styles.buttonText}>Remover</Text>
                    </TouchableOpacity> 
                : null}
            </View>

        );
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue'
    },
    button: {
        alignSelf: "center",
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 0,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    tituloDet: {
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
        marginBottom: 12,
        marginLeft: 15,
        fontWeight: "bold"
    }
})