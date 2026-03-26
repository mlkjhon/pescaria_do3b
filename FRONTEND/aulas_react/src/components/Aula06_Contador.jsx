import { useState } from "react";


const Aula06_Contador = () => {

    const [contador, setContador] = useState(0)

    const diminuir = () => {
        if(contador > 0) {
            setContador(contador - 1)
        }
    }

    return(
        <div>
            <hr />
            <br />
            <h3> Contador </h3>
            <br />

            <h2>Nº: {contador}</h2>
            <button onClick={() => setContador(contador + 1)}>Aumentar</button>
            <br />
            <button onClick={diminuir}>Diminuir</button>

        </div>
    )

}

export default Aula06_Contador;