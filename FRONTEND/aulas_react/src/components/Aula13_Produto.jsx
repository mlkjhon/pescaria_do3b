const Aula13_Produto = ({ produto, botaoExcluir, botaoAlterar }) => {

    return (
        <div style={estilos.cardProduto}>

            <img src={produto.link_imagem} alt="" style={estilos.imagem} />

            <h2 style={estilos.nome}>{produto.nome}</h2>

            <p style={estilos.preco} >R$ {Number(produto.preco).toFixed(2)}</p>

            <p>{produto.categoria}</p>

            {/*Frete Grátis*/}
            {produto.frete == true && <p style={{ fontWeight: "bold" }}>Frete Grátis</p>}

            <a href={produto.link_produto} style={estilos.botao}>Ver Produto</a>

            <button onClick={() => botaoExcluir(produto.id_produto)} style={estilos.botao}>Excluir</button>
            <button onClick={() => botaoAlterar(produto)} style={estilos.botao}>Alterar</button>

        </div>
    )
};

/** @type {{ [key: string]: import('react').CSSProperties }} */

const estilos = {
    cardProduto: {
        border: "1px solid #ccc",
        padding: 10,
        width: 250
    },


    imagem: {
        height: 150,
        width: "100%",
        objectFit: "contain"
    },


    nomeProduto: {
        fontSize: 14,
        color: "#333",
        textAlign: "center"
    },


    preco: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#e30613"
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
    },

    freteGratis: {
        fontWeight: "bold"
    }
};


export default Aula13_Produto;
