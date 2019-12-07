import React from 'react'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {StyleSheet, Button} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from "./src/screens/LoginScreen";
import MenuPrincipal from "./src/screens/MenuPrincipal";
import Detalhes from "./src/screens/Detalhes";
import Cadastro from "./src/screens/Cadastro";
import Home from "./src/screens/Home";



const stackNavigator = createStackNavigator({
    LoginScreen : {
        screen: LoginScreen
    },
    MenuPrincipal: {
        screen: MenuPrincipal,
        navigationOptions: ({navigation}) => ({
          headerStyle: {
            backgroundColor: 'darkgrey'
          },
          headerLeft: <Icon size={24} style={styles.tab} name="menu" onPress={()=>navigation.toggleDrawer()}/>
        }),
    },
    Detalhes: {
      screen: Detalhes
    },
    Cadastro:{
      screen: Cadastro
    },
    
});



export default createAppContainer(stackNavigator);

const styles = StyleSheet.create({
  tab: {
    marginLeft: 10,
    color: 'white',
    fontSize: 30,
  }
})
