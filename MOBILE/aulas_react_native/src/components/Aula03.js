import { View, Text, FlatList } from 'react-native'
import Hr from './Hr'

const Aula03 = () => {
    const turmas = [
        {id: 1, turma: '3°B', pontos: 10},
        {id: 2, turma: '3°A', pontos: 20},
        {id: 3, turma: '2°B', pontos: 15},
        {id: 4, turma: '2°A', pontos: 5}
    ];
 
    function exibirItensLista({item}){
        return(
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{item.turma}</Text>
                <Text>{item.id}</Text>
            </View>
        )
    }

    function exibirItensListaInterclasse({item}){
        return(
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Turma:{item.turma}</Text>
                <Text>{item.id}</Text>
                <Text>Pontos:{item.pontos}</Text>
            </View>
        )
    }

    return(
        <View>
            <Hr />
            <Text>Aula 03 - Lista com FlatList</Text>
            <Text>Aprendendo a manipular listas em React Native</Text>
            <Hr/>

            {/* Criando Listas com função .map() do vetor */}
            {
                turmas.map((item)=>(
                    <Text key={item.id}>{item.turma}</Text>
                ))
            }
            <Text>Lista com FlatList</Text>
            <FlatList
                data={turmas}
                renderItem={exibirItensLista}
                keyExtractor={item => item.id}
            />

            {/* Criando classificação do Interclasse SESI */}
            <Hr />
            <Text>Lista Interclasse SESI</Text>

            <FlatList
                data={turmas}
                renderItem={exibirItensListaInterclasse}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
export default Aula03