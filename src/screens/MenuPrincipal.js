import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';


import Home from './Home'
import Cadastro from './Cadastro'
import MeusDados from './MeusDados'
import Detalhes from './Detalhes'
import { createStackNavigator } from 'react-navigation-stack';

const drawerNavigation = createDrawerNavigator({
    Home: { 
        screen: Home,
        navigationOptions: () => 
            ({
                title: 'Livros à venda'
            }) 
    },
    MeusDados: {
            screen: MeusDados,
            navigationOptions: () => 
                ({
                    title: 'Meus dados'
                }) 
    }
});


export default createAppContainer(drawerNavigation);