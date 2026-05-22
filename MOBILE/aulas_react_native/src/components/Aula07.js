import {View, Text, FlatList} from 'react-native';
import * as Animar from 'react-native-animatable';
import Hr from './Hr';

const aula07 = () => {
    return (
        <View>
            <Hr />
            <Text>Aula 07 - Estilos de Navegação</Text>
            <Text>Estilo denavegação estilo Tab no App</Text>
            <Hr/>
            <Animar.Text animation="flipInY" iteractionCount = 'Infinite'>Texto Animado</Animar.Text>
        </View>
    )
}

export default aula07;
