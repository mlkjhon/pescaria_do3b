const Aula04_IMC = ({nome, peso, altura, cor}) => {

    // let nome = 'Renato Cariani';
    // let peso = 90;
    // let altura = 180;
    let imc = peso / (altura * altura )


    return(
        <div>
            <h3>Calculadora de IMC</h3>
            <p style={{color: cor}}>Olá, {nome}!</p>
            <p>Altura: {altura}cm</p>
            <p>Peso: {peso}kg</p>
            <p>IMC: {imc.toFixed(2)}kg/m²</p>
        </div>
    )
}

export default Aula04_IMC;