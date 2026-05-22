import { View, Text, Image } from 'react-native';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { TextInput } from 'react-native-web';
import Hr from './Hr';

export default function Aula02() {
    const [nome, setNome] = useState('');

    return (
        <View>
            <Hr />
            <Text>Componentes Basicos</Text>
            <Text>Conhecendo os principais componentes do React Native</Text>
            <Hr />

            <Image source = {{uri : 'https://preview.redd.it/whats-the-origin-of-this-image-v0-x4fgk1s20sie1.jpeg?width=640&crop=smart&auto=webp&s=fa6e4d1187fa5bd14b0fbb1d910a8ae9e1a95235'}} 
            style = {{whidth: 150, height: 300}} />

            <Image source = {require ('../assets/logo.png')}
            style = {{whidth: 50, height: 50}}/>

            <Image source = {logo} 
            style = {{whidth: 50, height:50}}  />

            <TextInput 
                placeholder='Digite seu nome:'
                //Não preciso de arrow function ( ) =>
                onChangeText = {setNome}
                style = {{borderWidth: 1, marginBottom: 10, padding: 10}}
            />
            <Text>Seu nome é {nome}</Text>

            <button title='Clique Aqui!' 
             onPress = {() => console.log('Bem vindo')}   
            />/
        </View>
    )
}