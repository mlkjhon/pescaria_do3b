import {estilos} from "../styles/Estilos"
import Aula11_CadastroProduto from "./Aula11_CadastroProduto";

const Aula11 = () => {
    return(
        <div style={estilos.cardAula}>
            <h2>Aula 11 - Cadastro de Produtos</h2>
            <h3>Criando uma lista de produtos e aramazenando os dados localmente</h3>
            <hr />
            <br />
            <Aula11_CadastroProduto/>
        </div>
    )
}

export default Aula11;
