import { useState } from "react";

const Aula06_Calculadora = () => {

    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [operador, setOperador] = useState("");
    const [resultado, setResultado] = useState("");

    if(operador === "+"){
        setResultado(n1 + n2)
    } else if(operador === "-"){
        setResultado(n1 - n2)
    } else if(operador === "*"){
        setResultado(n1 * n2)
    } else if(operador === "/"){
        setResultado(n1 / n2)
    }else if(operador === "**"){
        setResultado(n1 ** n2)
    }
    

    return(
        <div>
            <hr />
            <br />

            <input type="number" onChange={(event) => {event.target.value}}/>
            <select name="operadores" onChange={(event) => {event.target.value}}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
                <option value="**">**</option>
            </select>
            <input type="number" onChange={(event) => {event.target.value}}/>
            <button onClick={operador}>Resolver</button>

            <p>Resultado da Operação: {resultado}</p>
        </div>
    )

}

export default Aula06_Calculadora;