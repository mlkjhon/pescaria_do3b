//Aqui é onde importaremos todas as bibliotecas e componentes que utilizaremos
import { StatusBar } from 'expo-status-bar';
//todo componente visual utilizado em react native precisa ser importado
import { StyleSheet, Text, View } from 'react-native';

//componente tradicional
export default function Aula01() {
  return (
    //componente view, corresponde a qualquer container do html
  <View style={styles.container}>
      {/* O componente text corresponde ao p, h1, h2, h3, h4 ou span do html  */}
      <Text style = {styles.titulo}>Hello World</Text>
      <Text style = {{fontWeight: 'bold'}}>Esse é meu primeiro App</Text>
      {/* Defino e estilizo a barra de status do dispositivo */}

      <View style = {styles.container2}>
        <Text style = {styles.subtitulo1}>Esquerda Azul</Text>
        <Text style = {styles.subtitulo2}>Direita Negrito</Text>
        <Text style = {styles.subtitulo3}>Centro Vermelho</Text>
      </View>

      <StatusBar style="auto" />
  </View>
  );
}


//Para estilizarmos em React Native, importamos o StyleSheet
// e fazemos um objeto estilização igual ao react
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 30,
    fontWeight: 'bold',
    
  },
  container2:{
    width: '100%'
  },
  subtitulo1:{
    color: 'blue',
    textAlign: 'left'
  },
  subtitulo2:{
    fontWeight: 'bold',
    textAlign: 'right'
  },
  subtitulo3:{
    color: 'red',
    textAlign: 'center'
  }
});
