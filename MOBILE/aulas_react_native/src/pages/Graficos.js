import { View, Text, Button } from 'react-native';

function Grafico({ navigation }) {
    return (
        <View style = {{flex: 1, justifyContent:'center', alignItems: 'center',
            backgroundColor: '#a5e1e9'
        }}>
            <Text style={{fontSize: 30}}>Tela de Grafico</Text>
            <Button 
                title="Voltar"
                onPress={() => navigation.goBack()}
            />
            <Button 
                title="Tela de Cadastro"
                onPress={() => navigation.navigate('Cadastro')}
            />
            <Button 
                title="Tela de Relatorio"
                onPress={() => navigation.navigate('Relatorio')}
            />
        </View>
    );
}

export default Grafico;