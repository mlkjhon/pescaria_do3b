import { useState, useEffect } from "react";
import { estilos } from "../styles/Estilos"
import Aula12_CEP from "./Aula12_CEP";

const Aula12 = () => {

    const [imagem, setImagem] = useState('');

    const buscarDados = async () => {
        try {
            //No fetch colocamos o endpoint da API
            const resposta = await fetch('https://dog.ceo/api/breeds/image/random');
            const dados = await resposta.json();
            console.log(dados.message);

            setImagem(dados.message);
        } 
        catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    }

    useEffect( () => {
        buscarDados()
    }, [] );

    return (
        <div style={estilos.cardAula}>
            <h2>Aula 12 - Consumo de APIs</h2>
            <h3>Aprendendo a utilizar APIs em React</h3>
            <hr />
            <br />

            <div style={estiloso.card}>
                <p style={{ fontWeight: 'bold' }}>Imagem de Cachorro</p>
                <img src={imagem} width={300} style={estiloso.imagem} />
                <button style={estiloso.botao} onClick={buscarDados}>Exibir Imagem</button>
            </div>

            <Aula12_CEP/>

        </div>
    )
}

const estiloso = {

    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        background: "linear-gradient(135deg, #9e9e9e, #cfcfcf)",
        padding: "25px",
        borderRadius: "12px",
        width: "350px",
        color: "white",
        fontSize: "18px",
        fontWeight: "500",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        textAlign: "center"
    },
    botao: {
        background: "linear-gradient(135deg, #3C0A6D, #11002C)",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    },
    imagem: {
        maxWidth: "500px",
        maxHeight: "400px",
        width: "100%",
        objectFit: "cover",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
    }
};

export default Aula12;
