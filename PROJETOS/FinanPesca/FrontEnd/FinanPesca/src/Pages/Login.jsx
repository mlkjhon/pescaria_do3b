import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {enderecoServidor} from "../utils";
import { tokens, injectGlobalStyles, LoadingOverlay, Icon, Logo } from "../Styles/Estilos";

// Injeta os estilos do Design System
injectGlobalStyles();

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Adicionado state de loading (tela de loading)

    //Verificar email e senha, se estiver correto, fazer login
    async function botaoEntrar(event) {
        event.preventDefault(); // Agora o preventDefault previne até comportamentos de botões soltos
        try {
            if(email == '' || senha == ''){
                setMessage("Preencha todos os campos");
                return;
            }

            setLoading(true); // <--- ATIVA TELA DE LOADING

            const login = {
                "email": email,
                "senha": senha
            }
            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(login)
            });

            //Verificar a resposta
            if(resposta.status == 404){
                setMessage(`Rota não encontrada: ${resposta.url}`);
                setLoading(false); // desativa loading no erro
                return;
            }
                const dados = await resposta.json();
           if(resposta.ok){

            localStorage.setItem("Usuario logado", JSON.stringify(dados));
            navigate("/Principal");
           } else{
            setMessage('Email ou senha incorretos');
           }
            setLoading(false); // <--- DESATIVA TELA DE LOADING
        } catch (error) {
            setMessage(`Email ou senha incorretos ${error.message}`);
            setLoading(false); // desativa loading no erro
        } 
    }

    return (
        <div style={pageStyle}>

            {/* Tela de Loading que aparece depois de apertar entrar */}
            {loading && (
                <LoadingOverlay
                mensagem="Verificando credenciais..."
                submensagem="Aguarde um momento 🐟"
                />
            )}

            {/* Decoração de fundo */}
            <div style={bgDotStyle} />

            {/* A div principal do formulário (com as suas divs internas originais) */}
            <div className="fp-card fp-card-anim" style={cardStyle}>
                
                {/* Logo Bonitinha em cima */}
                <div style={{ marginBottom: "28px" }}>
                    <Logo size={52} showText={true} />
                </div>

                <div style={fieldGroup}>
                    <label style={labelStyle}>Email</label>
                    <div style={inputWrapper}>
                       <span style={iconLeft}><Icon name="email" size={16} color={tokens.color.textLight} /></span>
                       <input type="email" placeholder="Digite seu email" 
                        value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="fp-input" />
                    </div>
                </div>

                <div style={fieldGroup}>
                    <label style={labelStyle}>Senha</label>
                     <div style={inputWrapper}>
                       <span style={iconLeft}><Icon name="lock" size={16} color={tokens.color.textLight} /></span>
                       <input type="password" placeholder="Digite sua senha" 
                        value={senha} onChange={(e) => setSenha(e.target.value)} 
                        className="fp-input" />
                    </div>
                </div>

                <button className="fp-btn-primary" onClick={botaoEntrar} style={{ marginTop: "16px" }}>
                    Entrar
                </button>

                <div className="fp-divider" style={{ margin: "24px 0 20px" }}>ou</div>

                <p style={footerItem}>Não tem uma conta? <Link to="/cadastro" className="fp-link">Cadastre-se</Link></p>
                <p style={footerItem}>Esqueceu sua senha? <Link to="/recuperar-senha" className="fp-link">Recuperar senha</Link></p>
                
                {/* Mensagem de Erro baseada no seu <p style={{color:'red'}}>{message}</p> */}
                {message && <p style={errorStyle}>{message}</p>}
                
            </div>
        </div>
    )
}

// ─── Estilos estáticos locais para não sujar sua função principal ──────────────

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: tokens.color.bgPage,
  padding: tokens.space.md,
  position: "relative",
  overflow: "hidden",
};

const bgDotStyle = {
  position: "absolute",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${tokens.color.accentLight} 0%, transparent 65%)`,
  top: "-160px",
  right: "-160px",
  pointerEvents: "none",
};

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  textAlign: "center",
  position: "relative",
  zIndex: 1
};

const fieldGroup = {
  marginBottom: "16px",
  textAlign: "left",
};

const labelStyle = {
  display: "block",
  fontSize: tokens.font.sizeSm,
  fontWeight: tokens.font.weightSemibold,
  color: tokens.color.textMuted,
  marginBottom: "6px",
  fontFamily: tokens.font.family,
};

const inputWrapper = {
  position: "relative",
};

const iconLeft = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  zIndex: 1,
};

const footerItem = {
  fontSize: tokens.font.sizeSm,
  color: tokens.color.textMuted,
  fontFamily: tokens.font.family,
  marginBottom: "8px",
};

const errorStyle = {
  color: tokens.color.error,
  background: tokens.color.errorBg,
  padding: "10px",
  borderRadius: tokens.radius.md,
  border: `1px solid rgba(192,57,43,0.2)`,
  marginTop: "16px",
  fontSize: tokens.font.sizeSm,
  fontWeight: tokens.font.weightMedium,
};
