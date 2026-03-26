import { estilos } from "./GamesEstilos";
import { useState } from "react";

const Game  = () => {

    const [numeroSecreto, setNumeroSecreto] = useState(sortearNumero);
    const [chute, setChute] = useState();
    const [mensagem, setMensagem] = useState('Advinhe um número entre 1 a 100');
    const [tentativas, setTentativas] = useState(1);
    const [jogoFinalizado, setJogoFinalizado] = useState(false);
    
    function sortearNumero() {
        return Math.floor(Math.random() * 100) + 1
    }

    function botaoChutar() {
        if (numeroSecreto == chute){
            setMensagem(`🥳Parabéns🥳 Você acertou o número com ${tentativas} tentativas!`);
            setJogoFinalizado(true);
        } else if (numeroSecreto < chute) {
            setMensagem(`Você chutou ${chute}, o número secreto é MENOR`);
            setChute('');
            setTentativas(tentativas + 1);
        } else {
            setMensagem(`Você chutou ${chute}, o número secreto é MAIOR`);
            setChute('');
            setTentativas(tentativas + 1);
        }
    }

    function botaoNovoJogo(){
        setChute('');
        setJogoFinalizado(false);
        setTentativas(1);
        setMensagem('Advinhe um número entre 1 a 100');
        setNumeroSecreto(sortearNumero)
    }

    return(
        <section style={estilos.container}>
            <div style={estilos.conteudo}>
                <div style={estilos.informacoes}>
                    <div style={estilos.texto}>
                        <h1 style={estilos.h1}>Jogo Número Secreto</h1>
                        <p style={estilos.mensagem}>{mensagem}</p>
                    </div>
                    <input type="number" style={estilos.chute} onChange={(event) => setChute(event.target.value)} value={chute} />
                    <div style={estilos.botoes}>
                        <button style={estilos.botao} onClick={botaoChutar}>Chutar</button>
                        <button style={estilos.botao} onClick={botaoNovoJogo}>Novo Jogo</button>
                    </div>
                </div>
                <img src="./img/iaiaaeloalo.png" style={estilos.imagem}/>
            </div>
        </section>
    )
}

export default Game;