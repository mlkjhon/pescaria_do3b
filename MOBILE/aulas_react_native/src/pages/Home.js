import { View, Text, Button } from 'react-native';

function Home({ navigation }) {
    return (
        <View style = {{flex: 1, justifyContent:'center', alignItems: 'center',
            backgroundColor: '#d5edb9'
        }}>
            <Text style={{fontSize: 30}}>Tela Principal</Text>
            <Button 
                title="Tela de Cadastro"
                onPress={() => navigation.navigate('Cadastro')}
            />
            <Button 
                title="Tela de Relatorio"
                onPress={() => navigation.navigate('Relatorio')}
            />
            <Button 
                title="Tela de Grafico"
                onPress={() => navigation.navigate('Grafico')}
            />
        </View>
    );
}

export default Home;