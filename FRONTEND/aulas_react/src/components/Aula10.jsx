import { useEffect, useState } from "react"
import { estilos } from "../styles/Estilos";

const Aula10 = () => {

    const [contador, setContador] = useState(0);

    // O useEffect fica monitorando uma variável e executa a função sempre que ela sofrer uma alteração
    //Esse efeito sempre será exectado sempre que  o "contador" mudar 
    useEffect(() => {
        console.log(contador);
        // document.title = `Contagem: ${contador}`
    }, [contador]);

    //O useEffect com [] vazia, significa que o efeito deve ser executado apenas quando a pagina é carregada
    useEffect(() => {
        const contadorSalvo = localStorage.getItem('contador') || 0;
        setContador(JSON.parse(contadorSalvo));
    }, []);

    function botaoContador() {
        const novoContador = contador + 1;
        setContador(novoContador);
        //Armazenando localmente nosso contador
        localStorage.setItem('contador', JSON.stringify(novoContador));
    }

    return (
        <div style={estilos.cardAula}>
            <h2>Aula 10 - Introdução a useEffect e localStorage</h2>
            <h3>Conhecendo a Hook use|Effect e aprendendo a armazenar dados localmente</h3>
            <hr />
            <br />

            <div style={estiloso.card}>
                <p>Você clicou {contador} vezes</p>
                <button onClick={botaoContador} style={estiloso.botao} >Clique aqui</button>
            </div>


        </div>
    )


}

const estiloso = {
    card: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(135deg, #5f2c82, #7b2ff7)",
        padding: "20px 30px",
        borderRadius: "12px",
        width: "400px",
        color: "white",
        fontSize: "18px",
        fontWeight: "500",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    },

    botao: {
        // background: "linear-gradient(135deg, #7b2ff7, #9d4edd)",
        background: "linear-gradient(135deg, #3C0A6D, #11002C)",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    }
};

export default Aula10;
