import { useState, useEffect } from "react";
import Aula09_Nomes from "./Aula09_Nomes";

const Aula09_Lista = () => {

    const [listaPresenca, setListaPresenca] = useState([]);
    const [nome, setNome] = useState("");

    const limparLista = () => {
        setListaPresenca([]);
        localStorage.removeItem('nome');
    };

    const botaoAdicionarNome = () => {
        if (nome === "") return;

        const novaLista = [...listaPresenca, nome];
        setListaPresenca(novaLista);
        localStorage.setItem('nome', JSON.stringify(novaLista));
    };

    const excluirPessoa = (index) => {
        const novaLista = listaPresenca.filter((_, i) => i !== index);
        setListaPresenca(novaLista);
    };

    //UseEffect
    useEffect(() => {
        const listaPresentes = localStorage.getItem('nome') || "[]";
        setListaPresenca(JSON.parse(listaPresentes));
    }, []);



    return (
        <div style={estilos.container}>
            <div style={estilos.card}>
                <h2 style={estilos.titulo}>
                    Lista de Presença 🍖🔥
                </h2>

                <input
                    type="text"
                    placeholder="Digite o nome e o que deve levar"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={estilos.input}
                />

                <div style={estilos.botoes}>
                    <button
                        onClick={botaoAdicionarNome}
                        style={estilos.botaoAdicionar}
                    >
                        Adicionar
                    </button>

                    <button
                        onClick={limparLista}
                        style={estilos.botaoLimpar}
                    >
                        Limpar
                    </button>
                </div>

                <div style={estilos.lista}>
                    {
                        listaPresenca.map((item, index) => (
                            <Aula09_Nomes
                                key={index}
                                nome={item}
                                index={index}
                                excluir={excluirPessoa} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

/** @type {{ [key: string]: import('react').CSSProperties }} */

const estilos = {
    container: {
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e1e2f, #2b2b45)"
    },
    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        textAlign: "center",
        marging: '10px'
    },
    titulo: {
        marginBottom: "20px"
    },
    input: {
        // width: "100%",
        // padding: "10px",
        // borderRadius: "8px",
        // border: "1px solid #ccc",
        // marginBottom: "15px"
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "15px",
        boxSizing: "border-box"
    },
    botoes: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
    },
    botaoAdicionar: {
        padding: "8px 15px",
        borderRadius: "8px",
        border: "none",
        background: "linear-gradient(135deg, #7b2ff7, #9f44d3)",
        color: "#fff",
        cursor: "pointer"
    },
    botaoLimpar: {
        padding: "8px 15px",
        borderRadius: "8px",
        border: "none",
        // background: "#ff4d4d",
        background: "linear-gradient(135deg, #ff4d4d, #cc0000)",
        color: "#fff",
        cursor: "pointer"
    },
    lista: {
        textAlign: "left"
    }
}

export default Aula09_Lista;