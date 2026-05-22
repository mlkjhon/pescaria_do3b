import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { initialRouteName } from "@react-navigation/native";


import Home from "./Home";
import Cadastro from "./Cadastro";
import Relatorio from "./Relatorio";
import Grafico from "./Graficos"


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Aula01 from "../components/Aula01";
import Aula02 from "../components/Aula02";
import Aula03 from "../components/Aula03";
import Aula03_Exercicio from "../components/Aula03_Exercicio";
import Aula03_Exercicio2 from "../components/Aula03_Exercicio2";
import Aula04 from "../components/Aula04";
import Aula05 from "../components/Aula05";
import Aula06 from "../components/Aula06";
import Aula07 from "../components/Aula07";


//Criando nossa constante que cria o estilo de navegação em Drawer
const Drawer = createDrawerNavigator();

//Criando nossa função que vai retornar as telas
function NavDrawer() {
    return (
        // <NavigationContainer >
            <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: '#f2f2f2',
                        width: 240,

                    },

                    drawerLabelStyle: {
                        fontSize: 18
                    },
                    drawerActiveBackgroundColor: '#cce5ff'
                }}

            >
                <Drawer.Screen name="Home" component={Home}
                    options={{
                        title: 'Tela Principal',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="home" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Cadastro" component={Cadastro}
                    options={{
                        title: 'Tela de Cadastro',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="login" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Relatorio" component={Relatorio}
                    options={{
                        title: 'Tela de Relatorios',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="newspaper" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Grafico" component={Grafico}
                    options={{
                        title: 'Tela de Gráficos',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="insert-chart" size={24} color="black" />
                    }}

                />

                <Drawer.Screen name="Aula01" component={Aula01}
                    options={{
                        title: 'Aula 01',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula02" component={Aula02}
                    options={{
                        title: 'Aula 02',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula03" component={Aula03}
                    options={{
                        title: 'Aula 03',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula03_Exercicio" component={Aula03_Exercicio}
                    options={{
                        title: 'Aula 03 - Exercicio',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula03_Exercicio2" component={Aula03_Exercicio2}
                    options={{
                        title: 'Aula 03 - Exercicio 2',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula04" component={Aula04}
                    options={{
                        title: 'Aula 04',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula05" component={Aula05}
                    options={{
                        title: 'Aula 05',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula06" component={Aula06}
                    options={{
                        title: 'Aula 06',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen name="Aula07" component={Aula07}
                    options={{
                        title: 'Aula 07',
                        drawerIcon: ({ size, color }) => <MaterialIcons name="menu-book" size={24} color="black" />
                    }}
                />


            </Drawer.Navigator>
        // </NavigationContainer>
    );
}

export default NavDrawer;