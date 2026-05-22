import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";

import Home from "./Home";
import Cadastro from "./Cadastro";
import Relatorio from "./Relatorio";
import Grafico from "./Graficos"
import Login from "./Login"
import NavDrawer from "./NavDrawer"

//Criando nossa constante que cria o estilo de navegação em Stack
const BottomTab = createBottomTabNavigator();

//Criando nossa função que vai retornar as telas
function BottomTabs() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator initialRouteName="Login">
            <BottomTab.Screen name="Home" component={Home} />
            <BottomTab.Screen name="Cadastro" component={Cadastro} />
            <BottomTab.Screen name="Relatorio" component={Relatorio} />
            <BottomTab.Screen name="Grafico" component={Grafico} />
            <BottomTab.Screen name="Login" component={Login} />
            <BottomTab.Screen name="MenuPrincipal" component={NavDrawer}
                options={{
                    headerShown: false
                }}
            />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}

export default BottomTabs;