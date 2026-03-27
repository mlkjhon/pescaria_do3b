import {Link, useParams} from "react-router-dom";

const Filme = () => {
        const {id_filme} = useParams();

        return (
            <div>
                <h1>Dados do filme</h1>
                <img style={{width : 250}} src="https://m.media-amazon.com/images/M/MV5BYTRmMjkwYzYtYTRiMi00NDJjLTk1NjctMDA3MjY2ZWIyMGQ5XkEyXkFqcGc@._V1_.jpg" alt="" />
                <br />
                <p>Nome do Filme: <b>O poderoso Chefão</b></p>
                <br />
                <p>Ano de Lançamento: <b>7 de julho de 1972</b></p>
                <br />
                <p>Genero: <b>Mafia</b></p>
                <br />
                <Link to='/'>Voltar pra Principal</Link>
            </div>
        )
}
export default Filme