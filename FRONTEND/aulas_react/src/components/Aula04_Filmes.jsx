
const Aula04_Filmes = ({nome, generos, link}) => {
    return(
        //Div Mãe
        <div style={estilos.cardsFilmes}>
            <div style={estilos.filme}>
                <img src={link} alt="" style={estilos.img}/>
                <h3 style={estilos.titulo}>{nome}</h3>
                <p style={estilos.p}>{generos}</p>
                <button style={estilos.botao}>Assistir</button>
            </div>
        </div>

    )
}

/** @type {{ [key: string]: import('react').CSSProperties }} */

const estilos = {
    cardsFilmes: {
        display: 'inline-block',
        flexWrap: 'wrap'
        
    },
    filme: {
        flexDirection: 'column',
        backgroundColor: '#AFB4BD',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        margin: '10px ',
        padding: '15px',
        minWidth: '250px',
        maxWidth: '600px',
        minHeight: '50px',
        maxHeight: '400px',
        borderRadius: '8px',
        color: '#fff',
        fontFamily: "sans-serif",
        
       
    },
    img: {
        width: '100%',
        height: '270px'
    },
    botao: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '4px',
        width: '100%', 
        // height: '100%',
        border: 'none',
        padding: '10px',
        fontWeight: 'bold',
        marginTop: '10px'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: '20px',
        padding: '10px'
    },
    p: {
        fontSize:'15px'
    }
}




export default Aula04_Filmes;