import {Link, useParams} from "react-router-dom"

const Perfil = () =>{
    const { nome } = useParams();
    

    return(
        <div>
            <h1>Perfil de {nome}</h1>
            <Link to='/'>Voltar pra pagina principal</Link>
        </div>
    )
}
export default Perfil