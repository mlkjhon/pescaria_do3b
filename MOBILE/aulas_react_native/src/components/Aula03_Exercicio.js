import { View, Text, FlatList } from 'react-native'
import Hr from './Hr'

const Aula03_Exercicio = () => {
    // Vetor de alunos com os campos solicitados: id, aluno, mateia, media e faltas
    const alunos = [
        { id: 1, aluno: 'Ana Souza', mateia: 'Matemática', media: 8.5, faltas: 2 },
        { id: 2, aluno: 'Bruno Lima', mateia: 'Português', media: 7.0, faltas: 5 },
        { id: 3, aluno: 'Carla Dias', mateia: 'História', media: 9.2, faltas: 0 },
    ];

    // Função para renderizar cada item da lista
    function ExibirAlunos({ item }) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginvertical: 5, borderRadius: 5 }}>
                <Text>{item.id}º</Text>
                <Text>{item.aluno}</Text>
                <Text>{item.mateia}</Text>
                <Text>{item.media}</Text>
                <Text>{item.faltas}</Text>
                <Hr />
            </View>
        );
    }
    function CabecalhoLista() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#ccc' }}>
                <Text style={{ fontWeight: 'bold' }}>Posição</Text>
                <Text style={{ fontWeight: 'bold' }}>Aluno</Text>
                <Text style={{ fontWeight: 'bold' }}>Materia</Text>
                <Text style={{ fontWeight: 'bold' }}>Media</Text>
                <Text style={{ fontWeight: 'bold' }}>Faltas</Text>
            </View>
        )
    }


    return (
        <View>
            <Hr />
            <Text >Aula 03 - Exercício 1</Text>
            <Text >Lista de Alunos e Notas</Text>
            <Hr />

            <FlatList
                data={alunos}
                renderItem={ExibirAlunos}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={CabecalhoLista}
            />
        </View>
    );
};
export default Aula03_Exercicio;