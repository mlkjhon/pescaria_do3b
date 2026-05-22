import { View, Text, Button } from 'react-native';

function Cadastro({ navigation }) {
    return (
        <View style = {{flex: 1, justifyContent:'center', alignItems: 'center',
            backgroundColor: '#a5e1e9'
        }}>
            <Text style={{fontSize: 30}}>Tela de Cadastro</Text>
            <Button 
                title="Voltar"
                onPress={() => navigation.goBack()}
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

export default Cadastro;