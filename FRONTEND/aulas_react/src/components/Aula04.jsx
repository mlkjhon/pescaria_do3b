import {estilos} from "../styles/Estilos"
import Aula04_Filmes from "./Aula04_Filmes";
import Aula04_IMC from "./Aula04_IMC"

const Aula04 = () => {
    return(
        <div style={estilos.cardAula}>
            <h2>Aula 04 - Props</h2>
            <h3>Criação de componentes reutilizaveis e suas estilizações</h3>
            <p></p>
            <hr />
            <br />
            <Aula04_IMC nome='Renato Cariani' peso={95} altura={1.80} cor="Blue"/>
            <Aula04_IMC nome='Julio Balestrin' peso={113} altura={1.84} cor= "purple"/>
            <Aula04_IMC nome='Gustavo Henrique' peso={63} altura={1.72} cor= "#ff6300"/>
            <hr />
            <br />
            <Aula04_Filmes nome='Interestelar' generos='Ficção científica'link='https://7marte.com/wp-content/uploads/2014/11/Interstellar-cartaz-br-30set2014-696x1024.jpg'/>
            <Aula04_Filmes nome='+Velozes e +Furiosos' generos= 'Ação' link='https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/03/20/20077808.jpg'/>
            <Aula04_Filmes nome='Até o Último Homem' generos= 'Guerra' link='https://br.web.img2.acsta.net/c_310_420/pictures/16/11/21/15/29/457312.jpg'/>
            <Aula04_Filmes nome='TITANIC' generos= 'Romance' link='https://www.verdadeluz.com.br/wp-content/uploads/2020/05/TITANIC-Filme-Completo-697x1024.jpg'/>
            
        </div>
    )
}

export default Aula04;
