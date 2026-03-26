import { useState, useEffect } from "react";
import Aula13_Produto from "./Aula13_Produto";

const Aula13_CRUD_Produtos = () => {

    const [listaProdutos, setListaProdutos] = useState([
        {
            nome: "Tablet",
            preco: 3000,
            link_imagem: "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/kbtzoqkx/file.png",
            link_produto: "https://www.amazon.com.br/Samsung-Imersiva-Traseira-Frontal-Android/dp/B0F3LTWYS5/ref=asc_df_B0F3LTWYS5?mcid=8c14a46520583d1fb406de7e3ca424e8&tag=googleshopp00-20&linkCode=df0&hvadid=709884378406&hvpos=&hvnetw=g&hvrand=6213660297252230268&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100681&hvtargid=pla-2612474768592&psc=1&language=pt_BR&gad_source=1",
            categoria: "Eletrônicos",
            frete: true
        },
        {
            nome: "Máquina de Lavar",
            preco: 5000,
            link_imagem: "https://m.media-amazon.com/images/I/51dBND271dL._AC_SX679_.jpg",
            link_produto: "https://www.amazon.com.br/Lava-Seca-Samsung-Programas-Lavagem/dp/B0B61WJRY5/ref=asc_df_B0B61WJRY5?mcid=cdce2fb91c543f3791bae0b7cf5d9f57&tag=googleshopp00-20&linkCode=df0&hvadid=709884460960&hvpos=&hvnetw=g&hvrand=13523852478322651810&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100681&hvtargid=pla-2015085488298&psc=1&language=pt_BR&gad_source=1",
            categoria: "Eletrodomésticos",
            frete: true
        }
    ]);

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [link_imagem, setLink_Imagem] = useState('');
    const [link_produto, setLink_Produto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [frete, setFrete] = useState(false);

    //Criando variaveis de estado par alaterar meu cadastro
    const [editando, setEditando] = useState(false);
    const [id, setId] = useState('');

    //Função para carregar meus dados
    //Essa função recebe um objeto com todos os dados do produto
    const botaoAlterar = (produto) => {
        setNome(produto.nome);
        setPreco(produto.preco);
        setLink_Imagem(produto.link_imagem);
        setLink_Produto(produto.link_produto);
        setCategoria(produto.categoria);
        setFrete(produto.frete);
        setEditando(true);
        setId(produto.id_produto)
    };

    //Arrow function para button Adicionar Produto
    const botaoAdiconarProduto = async () => {

        const novoProduto = {
            nome: nome,
            preco: preco,
            link_imagem: link_imagem,
            link_produto: link_produto,
            categoria: categoria,
            frete: frete
        };

        try {

            let endpoint = 'http://localhost:3000/produtos';
            let metodo = 'POST';

            if (editando == true) {
                endpoint = `http://localhost:3000/produtos/${id}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoProduto)
            });

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar produto: ' + resposta)
            }

            buscarDados();
            LimparCamposFormularios();

        } catch (erro) {
            console.error('Erro ao adicionar Produto', erro.message);

        };

        // const novaListaProdutos = [...listaProdutos, novoProduto];
        // setListaProdutos(novaListaProdutos);

        // localStorage.setItem('vetorListaProdutos', JSON.stringify(novaListaProdutos));

    };

    //Botão excluir produto
    const botaoExcluir = async (id_produto) => {

        if (!window.confirm(`Deseja mesmo Excluir?`)) return

        try {
            const resposta = await fetch(`http://localhost:3000/produtos${id_produto}`, {
                method: 'DELETE'
            });

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar produto: ' + resposta.status)
            }

            buscarDados();

        } catch (erro) {
            console.error('Erro ao excluir Produto', erro.message);

        };

    };

    //Limpar formulários após clicar no botao de adicionar Produtos
    const LimparCamposFormularios = () => {
        setNome('');
        setPreco('');
        setLink_Imagem('');
        setLink_Produto('');
        setCategoria('');
        setFrete(false);
        setEditando(false);
        setId('');
    };

    useEffect(() => {
        // const listaSalva = localStorage.getItem('vetorListaProdutos') || '[]';
        // setListaProdutos(JSON.parse(listaSalva));
        buscarDados()
    }, []);

    //Função para buscar os dados de uma API 
    async function buscarDados() {

        const resposta = await fetch('http://localhost:3000/produtos');
        // const resposta = await fetch('http://10.130.42.68:3001/produtos');
        const dados = await resposta.json();
        setListaProdutos(dados);

        try {

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message);

        }
    }

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
                <input type="text" placeholder="Link da Imagem do Produto" value={link_imagem} onChange={(event) => setLink_Imagem(event.target.value)} />

                {/*Input Link Produto*/}
                <input type="text" placeholder="Link do Produto" value={link_produto} onChange={(event) => setLink_Produto(event.target.value)} />

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
                <button onClick={botaoAdiconarProduto}>
                    {editando == false ? "Adicionar Produto" : "Editar Produto"}
                </button>
                {
                    editando == true &&
                    <button onClick={LimparCamposFormularios}>Cancelar</button>
                }
                <hr />
                <br />


                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {
                        listaProdutos.map((produto, pos) => (
                            // <p key={pos}> {produto.nome} - R$ {produto.preco} </p>
                            <Aula13_Produto key={pos} produto={produto} botaoExcluir={botaoExcluir} botaoAlterar={botaoAlterar} />
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


export default Aula13_CRUD_Produtos;
