// Importando um arquivo CSS tardicional
import '../styles/Aula03.css'
import Aula03_Login from './Aula03_Login.jsx';
import {estilos} from "../styles/Estilos"

const Aula03 = () => {
    return(
        <div style={estilos.cardAula}>
            <h2>Aula 03 - Compontes e Estilização</h2>
            <h3>Criação de componentes reutilizáveis e suas estilizações</h3>
            <p>Aprendemos a criar e reutilizar componentes e estilizações para melhorar a UI</p>

            <br />

            {/* CSS Externo */}
            <hr />
            <p className="texto">CSS externo</p>
            <p className="descricao">A forma mais simples e clássica de estilização CSS</p>

            {/* CSS Interno */}
            <hr />
            <p style={{color: "red", fontWeight: "bold" }}>Estilização Inline</p>
            <p style={{fontStyle: "italic"}}>Estilos aplicados ditretamente aplicado como OBJETOS</p>

            {/* CSS Modules */}
            <hr />
            <p style={estilos.tituloModulo}>CSS Modules</p>
            <p style={estilos.descricaoModulo}>CSS modularizado é a forma mais comum para mobile</p>

            <hr />
            <Aula03_Login/>
        </div>
    )
}


export default Aula03;
