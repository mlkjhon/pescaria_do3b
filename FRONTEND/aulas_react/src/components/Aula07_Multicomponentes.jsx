

const Aula07_Multicomponentes = () => {

    return(
        <div>

            <p>Meu componente padrão</p>
            <br />
            <MeuComponeteNomeado/>

        </div>
    )

}

 export const MeuComponeteNomeado = () => {
    return(
        <p>Meu Componente Nomeado 1</p>
    )
}

const MeuComponeteNomeado2 = () => {
    return(
        <p>Meu Componente Nomeado 2</p>
    )   
}

export const enderecoServidor = 'localhost';

//Exportando componente nomeado
export { MeuComponeteNomeado2 }

//Exportando Componete Padrão
export default Aula07_Multicomponentes;