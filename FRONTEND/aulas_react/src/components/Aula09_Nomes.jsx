const Aula09_Nomes = ({ nome, index, excluir }) => (
    <div style={estiloItem.item}>
        <span>
    {/* Numero/Id     Nome da Pessoa*/}
            <strong>{index + 1}</strong> - {nome}
        </span>
        <button onClick={() => excluir(index)} style={estiloItem.botaoExcluir}>Excluir</button>
    </div>
);

/** @type {{ [key: string]: import('react').CSSProperties }} */

const estiloItem = {
    item: {
        padding: "10px",
        borderBottom: "1px solid #eee",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between", // empurra o botão pra ponta
        backgroundColor: "#F5F5F5",
        borderRadius: "5px",
        marginBottom: "2px",
        alignItems: "center"
    },

    botaoExcluir: {
        padding: "6px 14px",
        borderRadius: "8px",
        border: "none",
        // backgroundColor: "#ff4d4d",
        background: "linear-gradient(135deg, #ff4d4d, #cc0000)",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: '12px'
    }
};


export default Aula09_Nomes