import { useState } from "react";

const Aula06_Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const entrar = () => { 
        if (email === "senai@senai.br" && senha === "123") { 
            setMensagem("Login bem sucedido ✅"); 
        } 
        else { setMensagem("Email ou senha incorretos ❌" ); } };

    return(
        <div style={estilos.loginConteudo}>


                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png" alt="logoSenai" style={estilos.logoSenai} />
                <h2>Login</h2>

                <div style={estilos.campo}>
                    <label style={estilos.label}>Email</label>
                    <input  onChange={(event) => setEmail(event.target.value)} value={email} 
                      type="email" placeholder='Digite seu email' style={estilos.input} />
                </div>

                <div style={estilos.campo}>
                    <label style={estilos.label}>Senha</label>
                    <input onChange={(event) => setSenha(event.target.value)} value={senha} 
                        type="password" placeholder='Digite sua senha' style={estilos.input}/>
                </div>

                    <button style={estilos.botao} onClick={entrar}> Entrar </button>
                    <p style={{ fontWeight: 'bold' }}>{mensagem}</p>
            
        </div>
    )
}




/** @type {{ [key: string]: import('react').CSSProperties }} */

const estilos = {
    loginConteudo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: '10px auto',
        backgroundColor: '#fff',
        padding: '20px',
        fontFamily: 'sans-serif',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        gap: '10px'
    },
    logoSenai: {
        width: '200px'
    },
    campo:{
        width: '100%'
    },
    label: {
        display: 'block',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    },
    botao: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '4px',
        width: '100%',
        border: 'none',
        padding: '10px',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
}


export default Aula06_Login;