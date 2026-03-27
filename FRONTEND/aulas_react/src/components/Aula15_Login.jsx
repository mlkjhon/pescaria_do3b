import { useState } from "react";
import {endereco_servidor} from "../utils"
import { useNavigate } from "react-router-dom"

const Aula15_Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const entrar = async (e) => { 
       e.preventDefault();

        try {
            if (email == '' || senha == ''){
                throw new Error('Preencha todos os campos')
            } 

            const login = {
                email : email,
                senha : senha
            }

     //utilizando autenticação com a API do beackend
        const resposta = await fetch(`${endereco_servidor}/login`, {
            method: 'POST',
            headers:{'Content-Type' : 'application/json' },
            body: JSON.stringify(login)
        });
        const dados = await resposta.json()

        if (resposta.ok){
            console.log('Login bem Sucedido', dados);
            setMensagem('Login bem Sucedido 🫡');
            localStorage.setItem('UsuarioLogado', JSON.stringify(dados))
            navigate('/inicio')
            
        } else{
            setMensagem('Email ou senha incorretos 😒')
            console.log('Erro ao fazer login 😒', dados)
       }
     }  catch (error) {
            console.error('Erro ao realizar login', error)
            setMensagem(error.message)
        }
    };

     

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


export default Aula15_Login;