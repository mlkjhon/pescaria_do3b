import {Link} from "react-router-dom"

const Detalhes = () =>{
    return(
        <div>
            <h1>Detalhes</h1>
            <Link to='/'>Voltar pra pagina principal</Link> <br />
            <Link to='/contato'>Contato</Link>
        </div>
    )
}
export default Detalhes