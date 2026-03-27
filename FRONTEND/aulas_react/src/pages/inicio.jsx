import {Link} from "react-router-dom"

const Inicio = () =>{
    return(
        <div>
            <h1>Inicio</h1>
            <h2>Bem-Vindo ao Inicio</h2>
            <Link to='/'>Voltar pra pagina principal</Link> <br />
            <Link to='/detalhes'>Detalhes</Link>
        </div>
    )
}
export default Inicio