import {estilos} from "../styles/Estilos"
import Aula05_Exercicios from "./Aula05_Exercicios";

const Aula05 = () => {

    const botaoClique = () => {
        alert('Você clicou neste botão')
        console.log('Clique no botão');
        
    }
    // const botaoDuploClique = () => {
    //     alert('Você clicou 2x neste paragrafo')
    //     console.log('Clique no botão duplo clique');
    // }

    const entradaMouse = (event) => {
        console.log('Mouse entrou');
        event.target.style.backgroundColor = '#FF0000'
    }
    const saidaMouse = (event) => {
        console.log('Mouse saiu');
        event.target.style.backgroundColor = '#B22123'
    }
    const alterarCor = (event) => {
        if(event.key == 'a'){
            event.target.style.backgroundColor = '#0000ff'
            event.target.style.color = 'white'
        }
        else if(event.key == 'v'){
            event.target.style.backgroundColor = 'green'
            event.target.style.color = 'white'
        }
        else if(event.key == 'c'){
            event.target.style.backgroundColor = 'gray'
            event.target.style.color = 'white'
        }
        else if(event.key == 'r'){
            event.target.style.backgroundColor = 'purple'
            event.target.style.color = 'white'
        }
    }

    return(
        <div style={estilos.cardAula}>
            <h2>Aula 05 - Eventos de um componente</h2>
            <h3>Os eventos são fundamentais para criar interatividade em aplicativos web </h3>

            <hr />
            <br />

            <p>Evento onClick - clique do usuário em qualquer elemento</p>
            <button onClick={botaoClique}>Clique Aqui</button>
            
            <p onDoubleClick={()=> alert('Duplo clique')}>Este paragrafo recebe um duplo clique</p>

            <hr />
            <br />
            <p>Evento onChange - sempre que um campo de entrada é alterado</p>
            <input onChange={(event)=> console.log(event.target.value)} type="text" />
            <br />

            <select onChange={(event)=> alert(event.target.value) }>
                <option value="1A">1º A EM</option>
                <option value="2A">2º A EM</option>
                <option value="3A">3º A EM</option>
                <option value="3B">3º B EM</option>
            </select>

            <hr />
            <br />
            <p>Evento onMouseEnter / onMouseLeave</p>
            <p onMouseEnter={entradaMouse} onMouseLeave={saidaMouse}>Passe o mouse aqui ⬇️</p>

            <hr />
            <br />
            <p>Evento onKeyDown - Aciona evento quando pressiona uma tecla</p>
            <input type="text" onKeyDown={(event)=> alert(event.key)}/>
            <input type="text" onKeyDown={alterarCor} placeholder="a - azul, v - verde, c - cinza, r - roxo" />

            <br />
            <br />
            <hr />
            <br />
            <Aula05_Exercicios/>

        </div>
    )
}

export default Aula05;