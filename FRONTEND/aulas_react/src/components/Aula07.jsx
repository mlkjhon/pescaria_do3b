import {estilos} from "../styles/Estilos"
import {useState} from "react"
import Aula07_Multicomponentes, {enderecoServidor, MeuComponeteNomeado, MeuComponeteNomeado2} from "./Aula07_Multicomponentes"
import Aula07_Perfil, { Avatar, BotaoSeguir, InfoUsuario } from "./Aula07_Perfil"
import Aula07_PerfilCorrigido from "./Aula07_PerfilCorrigido"

const Aula07 = () => {

    return(
        <div style={estilos.cardAula}>

            <h2>Aula 07 - Importação e Exportação</h2>
            <h3>Compreendendo importação e exportação padrão ou nomeada</h3>
            <hr />
            <br />

            <Aula07_Multicomponentes/>
            <MeuComponeteNomeado/>
            <MeuComponeteNomeado2/>
            <p>{enderecoServidor}</p>
            <br />
            <hr />
            <br />
            <Aula07_Perfil
                foto="https://img.freepik.com/fotos-gratis/jovem-barbudo-com-camisa-listrada_273609-5677.jpg?semt=ais_hybrid&w=740&q=80"
                nome="João Silva"
            />
            <Aula07_Perfil
                foto="https://forbes.com.br/wp-content/uploads/2023/12/mulher-lidiane-jones-bumble.jpg"
                nome="Maria Santos"
            />

            <Aula07_PerfilCorrigido
                foto="https://img.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg?semt=ais_related_payload_trends&w=740&q=80"
                nome="Clotilda Amado"
            />

        </div>
    )

}

export default Aula07