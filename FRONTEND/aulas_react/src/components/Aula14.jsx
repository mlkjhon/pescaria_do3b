import { useState, useEffect } from "react";
import { estilos } from "../styles/Estilos";
import {Link, useNavigate} from "react-router-dom"

const Aula14 = () => {
    const navigate = useNavigate();

    return(
        <div style={estilos.cardAula}>
            <h2>Aula14 - React Router - Navegação em React</h2>
            <h3>Biblioteca que permite criar e gerenciar rotas React</h3>
            <hr />
            <h3>Navegação com Links no React Router</h3>
            <Link to='/'>Pagina Principal</Link>
            <br />
            <Link to='/Sobre'>Sobre</Link>
            <br />
            <Link to='/sesisenai'>Pagina não Encontrada</Link>
            <br />
            <h3>Navegação com programação utilizando o useNavigate</h3>
            <button onClick={() => navigate('/sobre')}>Sobre</button>
            <hr />
            <h3>Rota Dinamica com useParams</h3>
            <button onClick={() => navigate('/Perfil/Jhonatan')}>Perfil do Pesca</button>
            <button onClick={() => navigate('/Perfil/Gustavo')}>Perfil do Gh</button>
            <br />
            <hr />
            <br />
            <h3>Exercicio</h3>
            <Link to='/inicio'>Inicio</Link>
            <br />
            <p>Exercicio 2</p>
            <button onClick={() => navigate('/filme/1')}>Ver detalhe do Filme</button>
        </div>
    )
}

export default Aula14