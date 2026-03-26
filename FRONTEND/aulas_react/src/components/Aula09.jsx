import {estilos} from "../styles/Estilos";
import {useState} from "react";
import Aula07_Perfil from "./Aula07_Perfil";
import Aula09_Numero from "./Aula09_Numero";
import Aula09_Lista from "./Aula09_ListaNomes";

const Aula09 = () => {

    const [NumerosSorteados, setNumerosSorteados] = useState([10, 43, 28, 2]);

    const [listaPerfis, setListaPerfis] = useState([
        {"nome": "Santa Adélia", "foto": "https://media.licdn.com/dms/image/v2/D560BAQH7Sg9gypRwCA/company-logo_100_100/B56Zc7xR_5HUAU-/0/1749054464567/usinasantaadelia_logo?e=1773878400&v=beta&t=9JRRcm_-IgsQ2iGD1Hrl22MoMPY3EtrKvoj1tuyW0n8" },
        {"nome": "Neoenergia", "foto": "https://media.licdn.com/dms/image/v2/D4D0BAQGJ-ATwrvUJuw/company-logo_100_100/company-logo_100_100/0/1684928508417?e=1773878400&v=beta&t=A6v9kRMvMCrPffLs-O6c4y5F9cnlr-g4WROOK_PFs5A" },
        {"nome": "Gustavo Henrique", "foto": "https://media.licdn.com/dms/image/v2/D4D03AQF_BIgaoXjIvg/profile-displayphoto-scale_200_200/B4DZx4iqddJIAY-/0/1771548879681?e=1773878400&v=beta&t=90Anj_bsUjrVPP1RbQwwJ1xH9_gjI692DR-nabapiAM" },
        {"nome": "Jhonatan Moraes", "foto": "https://media.licdn.com/dms/image/v2/D4D03AQF1aTq9UcYWqQ/profile-displayphoto-scale_200_200/B4DZyZqShpJYAY-/0/1772104531336?e=1773878400&v=beta&t=5mObgitEOkNgGA5gkMSicidqk6OR9zDsJ5oqyfNoebE" },
        {"nome": "Douglas Camata", "foto": "https://media.licdn.com/dms/image/v2/D4D03AQEvR5LocPqIUw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1670817019633?e=1773878400&v=beta&t=ScLegIlF1sqaceItU9yo1LMYftjsdBXuGA9U1f7iEHM" }
    ]);

    const BotaoSortear = () => {
        const novoNumero = Math.floor(Math.random() * 60) + 1
        setNumerosSorteados([...NumerosSorteados, novoNumero])
        // NumerosSorteados.push(novoNumero);
    }

    const BotaoExcluir = (nr) => {
        const novosNumeros = NumerosSorteados.filter( (numero) => numero != nr )
        setNumerosSorteados(novosNumeros)
    }

    return(
        <div style={estilos.cardAula}>

            <h2>Aula 09 - Listas em React</h2>
            <h3>Exibindo conteúdos dinamicamente com listas</h3>
            <hr />
            <br />

            <button onClick={BotaoSortear}>Novo Número</button>

            <h3>Lista de Números Sorteados: </h3>
            {/* A função map é como o for para arrays/vetores */}
            {
                NumerosSorteados.map((numero, index) => (
                    <Aula09_Numero key={index} numero={numero} excluir={() => BotaoExcluir(numero)} />
                ))
            }
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                    listaPerfis.map( (perfil, index) => (
                        <Aula07_Perfil key={index} nome={perfil.nome} foto={perfil.foto}/>
                    ))
                }
            </div>

            <br />
            <br />
            <hr />
            <br />
            <Aula09_Lista/>
            
        </div>
    )

}

export default Aula09;