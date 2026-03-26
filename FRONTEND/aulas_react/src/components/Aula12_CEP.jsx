import { useState, useEffect } from "react";
import { estilos } from "../styles/Estilos"

const Aula12_CEP = () => {

    const [cep, setCep] = useState('');
    const [dados, setDados] = useState({})

    const buscarDados = async () => {
        try {
            //No fetch colocamos o endpoint da API
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            const dadosAPI = await resposta.json();
            console.log(dadosAPI);

            setDados(dadosAPI);
        } 
        catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    }

    // useEffect( () => {
    //     buscarDados()
    // }, [] );

    return (
        <div style={estiloso.container}>
            <br />
            <hr />
            <br />

           <div style={estiloso.card}>
                <h3 style={estiloso.titulo}>Buscar CEP</h3>

                <div style={estiloso.linha} >
                    <input type="text" value={cep} onChange={(event) => setCep(event.target.value)} style={estiloso.input} />
                    <button onClick={buscarDados} style={estiloso.botao} >Buscar</button>
                </div>

            {dados && (
                <div style={estiloso.resultado} >
                    <p><b>Logradouro:</b> {dados.logradouro}</p>
                    <p><b>Bairro:</b> {dados.bairro}</p>
                    <p><b>Cidade:</b> {dados.localidade}</p>
                    <p><b>Estado:</b> {dados.uf}</p>
                </div>
            )}

           </div>

        </div>
    )
}

/** @type {{ [key: string]: import('react').CSSProperties }} */

 const estiloso = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        // width: "40vh",
        background: "linear-gradient(135deg, #002242, #144774, #336FA5)",
        marginTop: "20px",
        borderRadius: '10px',
        padding: '10px'
    },

    card: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "25px",
        width: "350px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center"
    },

    titulo: {
        marginBottom: "20px",
        color: "#002242",
        fontFamily: 'arial, sans-serif',
        fontSize: '30px'
    },

    linha: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px"
    },

    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #336FA5",
        outline: "none",
        fontSize: "14px",
        background: '#dde8f9'
    },

    botao: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        background: "linear-gradient(135deg, #002242, #144774)",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    },

    resultado: {
        textAlign: "left",
        backgroundColor: "#dde8f9",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #336FA5"
    }

};


export default Aula12_CEP;
