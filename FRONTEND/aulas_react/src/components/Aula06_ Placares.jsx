import { useState } from "react";

const Aula06_Placares = () => {

    const [contador, setContador] = useState(0);

    const [contador2, setContador2] = useState(0);

    const [contador3, setContador3] = useState(0);

    const [contador4, setContador4] = useState(0);

    const botaoZerar = () => {
    setContador(0)
    setContador2(0)
    setContador3(0)
    setContador4(0)
}


    return(
        <div>
            <hr />
            <br />
            <h2> Placares </h2>
            <br />

            {/*Placar Comum*/}
            <h3>Brasiliense</h3>
            <p>{contador}</p>
            <button onClick={() => setContador(contador + 1)}>+1 Ponto</button>
            <br />
            <br />
            <h3>Capivariano</h3>
            <p>{contador2}</p>
            <button onClick={() => setContador2(contador2 + 1)}>+1 Ponto</button>
            <br />
            <br />

            {/*Placar Basquete*/}
            <h3>Lakers</h3>
            <p>{contador3}</p>
            <button onClick={() => setContador3(contador3 + 1)}>+1 Ponto</button>
            <button onClick={() => setContador3(contador3 + 2)}>+2 Pontos</button>
            <button onClick={() => setContador3(contador3 + 3)}>+3 Pontos</button>
            <br />
            <br />
            <h3>Chicago Bulls</h3>
            <p>{contador4}</p>
            <button onClick={() => setContador4(contador4 + 1)}>+1 Ponto</button>
            <button onClick={() => setContador4(contador4 + 2)}>+2 Pontos</button>
            <button onClick={() => setContador4(contador4 + 3)}>+3 Pontos</button>
            <br />
            <br />
            <button onClick={botaoZerar}>Zerar Placares</button>
            <hr />


        </div>
    )

}

export default Aula06_Placares;