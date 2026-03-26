import { useState, useEffect } from "react";
import { estilos } from "../styles/Estilos"

const Aula12_FakeStore = () => {

    const [id_produto, setId_Produto] = useState('');
    const [titulo, setTitulo] = useState({})
    const [preco, setPreco] = useState({})
    const [categoria, setCategoria] = useState({})
    const [imagem, setImagem] = useState({})

    const buscarDados = async () => {
        try {
            //No fetch colocamos o endpoint da API
            const resposta = await fetch(`https://https://fakestoreapi.com/products/${id_produto}`);
            const dadosAPI = await resposta.json();
            console.log(dadosAPI);

            set(dadosAPI);
        } 
        catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    }

    return (
        <div >
            <br />
            <hr />
            <br />


                <div  >
                    <h3 >Buscar </h3>
                    <input type="text" value={id_produto} onChange={(event) => setId_Produto(event.target.value)} />
                    <button onClick={buscarDados} >Buscar</button>
                </div>

            {dados && (
                <div>
                    <p><b>Imagem:</b> {image}</p>
                    <p><b>Título:</b> {title}</p>
                    <p><b>Categoria:</b> {category}</p>
                    <p><b>Preço:</b> {price}</p>
                </div>
            )}


        </div>
    )
}

/** @type {{ [key: string]: import('react').CSSProperties }} */


export default Aula12_FakeStore;
