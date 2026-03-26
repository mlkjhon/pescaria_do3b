const Aula05_Exercicios = () => {

    const entradaMouse = (event) => {
        console.log('Mouse entrou');
        event.target.style.backgroundColor = '#FF6700'
        event.target.style.color = 'white'
    }
    const saidaMouse = (event) => {
        console.log('Mouse saiu');
        event.target.style.backgroundColor = '#FF8A00'
         event.target.style.color = 'black'
        
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
        else if(event.key == 'y'){
            event.target.style.backgroundColor = 'yellow'
            event.target.style.color = 'black'
        }
    }
    const alterarCorTudo = (event) => {
        if(event.key == 'a'){
            event.target.style.backgroundColor = 'blue'
            event.target.style.color = 'white'
        }
        else if(event.key == 'p'){
            event.target.style.backgroundColor = 'black'
            event.target.style.color = 'white'
        }
        else if(event.key == 'v'){
            event.target.style.backgroundColor = 'red'
            event.target.style.color = 'white'
        }
        else if(event.key == 'y'){
            event.target.style.backgroundColor = 'yellow'
            event.target.style.color = 'white'
        }
        else if(event.key == 'g'){
            event.target.style.backgroundColor = 'green'
            event.target.style.color = 'white'
        }
        else if(event.key == '+'){
            event.target.style.fontSize= '24px'
            event.target.style.color = 'white'
        }
        else if(event.key == '-'){
            event.target.style.fontSize= '12px'
            event.target.style.color = 'white'
        }
        // (a – azul, p – preto, v – vermelho, y – amarelo, g – verde)
    
    }

    return(
        <div>
            <h2>Exercícios Aula 05 - Eventos</h2>
            <hr />
            <br />
            <p>Evento onClick e onDoubleClick</p>
            <button onClick={() => alert('Você clicou 1 vez')}>Clique Aqui</button>
            <br />
            <button onDoubleClick={() => alert('Você clicou 2 vezes')}>Clique Aqui 2x</button>
            <br />
            <br />

            <p>Evento onChange</p>
            <input onChange={(event)=> console.log(event.target.value)} type="text" />
            <br />

            <select onChange={(event)=> alert(event.target.value) }>
                <option value="Você selecionou Segunda e Terça">Segunda e Terça</option>
                <option value="Você selecionou Quinta e Sexta">Quinta e Sexta</option>
            </select>
            <br />
            <br />

             <p>Evento onMouseEnter e onMouseLeave</p>
            <p onMouseEnter={entradaMouse} onMouseLeave={saidaMouse}>Passe o mouse aqui ⬇️</p>

            <br />
            <p>Evento onKeyDown</p>
            <input type="text" onKeyDown={(event)=> alert(event.key)}/>
            <br />
            <input type="text" onKeyDown={alterarCor} placeholder="a - azul, v - verde, y - amarelo" />

            <br />
            <br />
            <p>Todos os Eventos</p>
            <input type="text" 
                onClick={() => alert('Você clicou 1 vez')} 
                onChange={(event)=> console.log(event.target.value)} 
                onMouseEnter={entradaMouse} onMouseLeave={saidaMouse}
                onKeyDown={alterarCorTudo} placeholder= 'digite uma letra e veja mudar de cor'
            />
            <br />
            <br />
            
            <hr />
        </div>
    )
}

export default Aula05_Exercicios;