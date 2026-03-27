import {Link} from "react-router-dom"

const Contato = () =>{
    return(
        <div>
            <h1>Contato</h1>
            <Link to='/'>Voltar pra pagina principal</Link> <br />
            <Link to='/inicio'>Voltar pra pagina o inicio</Link>
        </div>
    )
}
export default Contato