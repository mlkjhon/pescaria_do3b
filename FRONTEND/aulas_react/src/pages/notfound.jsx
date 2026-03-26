import {Link} from "react-router-dom"

const NotFound = () =>{
    return(
        <div>
            <h1>Pagina nao encontrada</h1>
            <Link to='/'>Voltar pra pagina principal</Link>
        </div>
    )
}
export default NotFound