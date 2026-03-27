import {Link, useParams} from "react-router-dom"

const Perfil = () =>{
    const { nome } = useParams();
    

    return(
        <div>
            <h1>Perfil de {nome}</h1>
            <img src='../pescaria.png' alt="" />
            <br />
            <Link to='/'>Voltar pra pagina principal</Link>
        </div>
    )
}
export default Perfil