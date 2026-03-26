import {useState} from "react"

const Aula07_Perfil = ({foto, nome}) => {

    return(
        <div style={estilos.cardsFilmes}>      
            <div style={estilos.filme}>

                <Avatar foto={foto} />
                <InfoUsuario nome={nome} />
                <BotaoSeguir/>
                
            </div>
        </div>
    )
}

export const Avatar = ({foto}) => {
    return(
        <img src={foto} alt="fotoPerfil" 
            style={estilos.img}/>
    )
}
export const InfoUsuario = ({nome}) => {
    return(
        <p style={estilos.titulo}>{nome}</p>
    )
}
export const BotaoSeguir = () => {

    const [seguindo, setSeguindo] = useState(false);

    return(
        <button onClick={()=> setSeguindo(!seguindo)} 
        style={{
            backgroundColor: seguindo == false ? "#7b2ff7" : "#1FB25A",
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '8px',
            // fontWeight: 'bold',
            cursor: 'pointer',
            // transition: '0.3s'
            }}>
            {seguindo == false ? 'Seguir' : 'Seguindo'}
        </button>
    )
}

/** @type {{ [key: string]: import('react').CSSProperties }} */

const estilos = {
    cardsFilmes: {
        display: 'flex'
        // justifyContent: 'center'
    },

    filme: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F2F5F7',
        padding: '25px',
        width: '150px',
        border: '1px solid #ccc',
        borderRadius: '16px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
        fontFamily: 'sans-serif',
        gap: '8px',
        margin: '10px'
    },

    img: {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '15px'
    },

    titulo: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#000',
        marginBottom: '15px'
    },

    // botao: {
    //     backgroundColor: seguindo == false ? "#7b2ff7" : "#9f44d3",
    //     color: 'white',
    //     border: 'none',
    //     padding: '8px 20px',
    //     borderRadius: '8px',
    //     // fontWeight: 'bold',
    //     cursor: 'pointer',
    //     transition: '0.3s'
    // }
}

//Exportando Componete Padrão
export default Aula07_Perfil;