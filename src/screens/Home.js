import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableHighlight, Stack,TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import firestore, {firebase} from '@react-native-firebase/firestore';

const extractKey = ({ id }) => id


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            livros: []
        }
        this.getLivros = this.getLivros.bind(this)
        this.goToNextScreen = this.goToNextScreen.bind(this)
    }

    goToNextScreen(item){
        this.props.navigation.navigate('Detalhes',{Book: item});
    }

    goToAddScreen(){
        this.props.navigation.navigate('Cadastro');
    }

    componentDidMount() {
        this.getLivros()
    }

    getLivros() {
        firestore().collection("livros").get()
            .then((querySnapshot) => {
                let livros = []
                querySnapshot.forEach((doc) => {
                    livros.push({id: doc.id,...doc.data()})
                });
                this.setState({ livros: livros })
            })
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.row} onPress={() => this.goToNextScreen(item)}>
                     <Text style={styles.letrasTitulo}>{item.titulo}</Text>
                     <Text >Autor(a): {item.autor}</Text>
                     <Text >Preço: R$ {item.preco}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.getLivros()} />
                <FlatList
                    data={this.state.livros}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                />
                <TouchableOpacity style={styles.floatingButton} onPress={() => this.goToAddScreen()}>
                    <Text style={styles.textoBotao}>+</Text>
                </TouchableOpacity>
            </View>

        );
    }  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue'
    },
    row: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 8,
        backgroundColor: 'white',
    },
    floatingButton: {
        backgroundColor: 'blue',
        borderRadius: 25,
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
     },
     textoBotao: {
        color: 'white',
        fontSize: 30
     },
     letrasTitulo: {
        fontWeight: "bold",
        fontSize: 20
     }
})