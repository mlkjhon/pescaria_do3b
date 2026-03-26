import {estilos} from "../styles/Estilos"
import {useState} from "react"
import Aula06_Contador from "./Aula06_Contador"
import Aula06_Placares from "./Aula06_ Placares"
import Aula06_Login from "./Aula06_Login"
import Aula06_Calculadora from "./Aula06_Calculadora"



const Aula06 = ()=> {

    //Declarando uma variável de estado
    const [ nome, setNome ] = useState('')
    const [ cidade, setCidade ] = useState('')
    const [ telefone, setTelefone ] = useState('')
    const [ limpar, setLimpar ] = useState('')
    const [ visivel, setVisivel ] = useState('')

    const botaoLimpar = () => {
        setNome("")
        setCidade("")
        setTelefone("")
    }
    
    return(
        <div style={estilos.cardAula}>

            <h2>Aula 06 - Estado de um componente</h2>
            <h3>O hook useState adiciona estado a componentes funcionais </h3>
            <hr />

            <br />
            <input type="text" onChange={(event)=> setNome(event.target.value)} value={nome} />
            <input type="text" onChange={(event)=> setCidade(event.target.value)} value={cidade} />
            <input type="text" onChange={(event)=> setTelefone(event.target.value)} value={telefone} />

            <p>Olá, {nome}, você mora em {cidade} e seu telefone é {telefone} </p>

            <button onClick={botaoLimpar}>Limpar</button>
            <hr />
            <br />

            <button onClick={()=> setVisivel(!visivel)}>
                {visivel == false ? <p> Mostrar Saldo 🔒 </p> : <p>Ocultar Saldo 🔓</p>}
            </button>

            {/* Condição                true                    false */}
            {visivel == false ? <p> R$ ***,** </p> : <p>R$ 100,00</p>}
            
            <Aula06_Contador/>
            <Aula06_Placares/>
            <Aula06_Login/>
            <Aula06_Calculadora/>

        </div>
    )
}

export default Aula06;