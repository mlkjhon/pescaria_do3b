const Aula13_Usuario = ({ usuario, botaoExcluir, botaoAlterar }) => {

    return (
        <div style={estilos.cardUsuario}>

            <h2 style={estilos.nomeUsuario}>{usuario.nome}</h2>

            <p style={estilos.nomeUsuario}>{usuario.email}</p>

             <button onClick={() => botaoExcluir(usuario.id_usuario)} style={estilos.botao}>Excluir</button>
             <button onClick={() => botaoAlterar(usuario)} style={estilos.botao}>Alterar</button>


        </div>
    )
};

const estilos = {
    cardUsuario: {
        border: "1px solid #ccc",
        padding: 10,
        width: 250
    },

    nomeUsuario: {
        fontSize: 14,
        color: "#333",
        textAlign: "center"
    },

     botao: {
        display: "inline-block",
        background: "#e30613",
        color: "white",
        textDecoration: "none",
        padding: "8px 12px",
        borderRadius: 5,
        marginTop: 10,
        fontWeight: "bold",
        gap: '10px',
        cursor: 'pointer'
    }
};


export default Aula13_Usuario;
