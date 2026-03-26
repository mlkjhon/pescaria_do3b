import { useState, useEffect } from "react";
import Aula11_Produto from "./Aula11_Produto";


const Aula11_CadastroProduto = () => {

    const [listaProdutos, setListaProdutos] = useState([
        {
            nome: "Tablet",
            preco: 3000,
            imagem: "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/kbtzoqkx/file.png",
            link: "https://www.amazon.com.br/Samsung-Imersiva-Traseira-Frontal-Android/dp/B0F3LTWYS5/ref=asc_df_B0F3LTWYS5?mcid=8c14a46520583d1fb406de7e3ca424e8&tag=googleshopp00-20&linkCode=df0&hvadid=709884378406&hvpos=&hvnetw=g&hvrand=6213660297252230268&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100681&hvtargid=pla-2612474768592&psc=1&language=pt_BR&gad_source=1",
            categoria: "Eletrônicos",
            frete: true
        },
        {
            nome: "Máquina de Lavar",
            preco: 5000,
            imagem: "https://m.media-amazon.com/images/I/51dBND271dL._AC_SX679_.jpg",
            link: "https://www.amazon.com.br/Lava-Seca-Samsung-Programas-Lavagem/dp/B0B61WJRY5/ref=asc_df_B0B61WJRY5?mcid=cdce2fb91c543f3791bae0b7cf5d9f57&tag=googleshopp00-20&linkCode=df0&hvadid=709884460960&hvpos=&hvnetw=g&hvrand=13523852478322651810&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100681&hvtargid=pla-2015085488298&psc=1&language=pt_BR&gad_source=1",
            categoria: "Eletrodomésticos",
            frete: true
        }
    ]);

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState('');
    const [link, setLink] = useState('');
    const [categoria, setCategoria] = useState('');
    const [frete, setFrete] = useState(false);

    //Arrow function para button Adicionar Produto
    const botaoAdiconarProduto = () => {

        const novoProduto = {
            nome: nome,
            preco: preco,
            imagem: imagem,
            link: link,
            categoria: categoria,
            frete: frete
        };

        const novaListaProdutos = [...listaProdutos, novoProduto];
        setListaProdutos(novaListaProdutos);

        localStorage.setItem('vetorListaProdutos', JSON.stringify(novaListaProdutos));

        setNome('');
        setPreco('');
        setImagem('');
        setLink('');
        setCategoria('');
        setFrete(false);

    }

    useEffect(() => {
        const listaSalva = localStorage.getItem('vetorListaProdutos') || '[]';
        setListaProdutos(JSON.parse(listaSalva));
    }, []);

    return (
        <div >
            {/*Título*/}
            <h2>Cadastro de Produto</h2>
            <div style={estilos.divmae}>
                {/*Input Nome Produto*/}
                <input type="text" placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)} />

                {/*Input Preco Produto*/}
                <input type="number" placeholder="Preço" value={preco} onChange={(event) => setPreco(event.target.value)} />

                {/*Input Imagem Produto*/}
                <input type="text" placeholder="Link da Imagem do Produto" value={imagem} onChange={(event) => setImagem(event.target.value)} />

                {/*Input Link Produto*/}
                <input type="text" placeholder="Link do Produto" value={link} onChange={(event) => setLink(event.target.value)} />

                {/*Select Categoria Produto*/}
                <select name="categorias" value={categoria} onChange={(event) => setCategoria(event.target.value)}>

                    {/*Eletronicos*/}
                    <option value="Eletronicos">Eletrônicos</option>

                    {/*Eletrodomesticos*/}
                    <option value="Eletrodomesticos">Eletrodomésticos</option>

                    {/*Decoração*/}
                    <option value="Decoracao">Decoração de Casa</option>

                    {/*Cosméticos*/}
                    <option value="Cosmeticos">Cosméticos</option>

                </select>

                {/*Input Checkbox Frete*/}
                <label><input type="checkbox" checked={frete} onChange={(event) => setFrete(event.target.checked)} />Frete Grátis</label>

                {/*Button Adicionar Produto*/}
                <button onClick={botaoAdiconarProduto}>Adicionar Produto</button>
                <hr />
                <br />

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {
                        listaProdutos.map((produto, pos) => (
                            // <p key={pos}> {produto.nome} - R$ {produto.preco} </p>
                            <Aula11_Produto key={pos} produto={produto} />
                        ))
                    }
                </div>

            </div>

        </div>


    );
};

/** @type {{ [key: string]: import('react').CSSProperties }} */

const estilos = {
    divmae: {
        display: 'Flex',
        flexDirection: 'column',
        gap: 10
    }
}

export default Aula11_CadastroProduto;

