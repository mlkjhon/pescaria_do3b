import logoReact from "../assets/react.svg";
import '../styles/Cabecalho.css';

const Cabecalho = ( {aula} ) => {
    return(
        <header className="cabecalho">
            <img src={logoReact} alt="logoReact" />
            <div>
                <h1>SENAI - Desenvolvimento de Sistemas</h1>
                <p>Aulas de Front-End - {aula} </p>
            </div>
            <img src="https://sesisenaisp.zendesk.com/hc/theming_assets/01HZKNSQKYGMZYJKC2QCPSG5FA" alt="logoSesiSenai" />
        </header>
    )
};

export default Cabecalho;      