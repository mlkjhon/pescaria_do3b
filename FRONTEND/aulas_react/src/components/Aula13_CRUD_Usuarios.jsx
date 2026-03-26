import { useState, useEffect } from "react";
import Aula13_Usuario from "./Aula13_Usuario";

const Aula13_CRUD_Usuarios = () => {

    const [listaUsuarios, setListaUsuarios] = useState([
        {
            nome: "Fulano",
            email: "fulano@email",
            senha: 2026,
        },
        {
            nome: "Gustavo Henrique",
            email: "gustavoh@email",
            senha: 2009,
        }
    ]);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //Criando variaveis de estado par alaterar meu cadastro
    const [editando, setEditando] = useState(false);
    const [id, setId] = useState('');

    //Função para carregar meus dados
    //Essa função recebe um objeto com todos os dados do produto
    const botaoAlterar = (usuario) => {
        setNome(usuario.nome);
        setEmail(usuario.email);
        setSenha(usuario.senha);
        setEditando(true);
        setId(usuario.id_usuario)
    };

    //Arrow function para button Adicionar Usuario
    const botaoAdiconarUsuario = async () => {

        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha,
            
        };

        try {
            let endpoint = 'http://10.130.42.68:3001/usuarios';
            let metodo = 'POST';

            if (editando == true) {
                endpoint = `http://10.130.42.68:3001/usuarios/${id}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                

                method: metodo,
                headers: {
                    'Content-Type': ' application/json'
                },
                body: JSON.stringify(novoUsuario)
            });

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar usuario: ' + resposta)
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

    //Botão excluir Usuário
    const botaoExcluir = async (id_usuario) => {

        if (!window.confirm(`Deseja mesmo Excluir?`)) return

        try {
            const resposta = await fetch(`http://10.130.42.68:3001/usuarios/${id_usuario}`, {
                method: 'DELETE'
            });

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar produto: ' + resposta.status.text)
            }

            buscarDados();

        } catch (erro) {
            console.error('Erro ao excluir Produto', erro.message);

        };

    };

    const LimparCamposFormularios = () => {
        setNome('');
        setEmail('');
        setSenha('');
        setEditando(false);
        setId('')
    };

    useEffect(() => {
        // const listaSalva = localStorage.getItem('vetorListaProdutos') || '[]';
        // setListaProdutos(JSON.parse(listaSalva));
        buscarDados()
    }, []);

    //Função para buscar os dados de uma API 
    async function buscarDados() {

        const resposta = await fetch('http://10.130.42.68:3001/usuarios');
        const dados = await resposta.json();
        setListaUsuarios(dados);

        try {

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message);

        }
    }

    return (
        <div >
            {/*Título*/}
            <h2>Cadastro de Usuário</h2>
            <div style={estilos.divmae}>
                {/*Input Nome Usuário*/}
                <input type="text" placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)} />

                {/*Input Emial Usuario*/}
                <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

                {/*Input Senha Usuario*/}
                <input type="password" placeholder="Senha" value={senha} onChange={(event) => setSenha(event.target.value)} />

                {/*Button Adicionar Usuario*/}
                <button onClick={botaoAdiconarUsuario}>
                    {editando == false ? "Adicionar Usuário" : "Editar Usuário"}
                </button>
                {
                    editando == true &&
                    <button onClick={LimparCamposFormularios}>Cancelar</button>
                }

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {
                        listaUsuarios.map((usuario, pos) => (
                            // <p key={pos}> {produto.nome} - R$ {produto.email} </p>
                            <Aula13_Usuario key={pos} usuario={usuario} botaoExcluir={botaoExcluir} botaoAlterar={botaoAlterar} />
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


export default Aula13_CRUD_Usuarios;
