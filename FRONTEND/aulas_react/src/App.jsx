import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Principal from './pages/principal'
import Sobre from './pages/sobre'
import NotFound from './pages/notfound'
import Perfil from './pages/Perfil'
import Inicio from './pages/inicio'
import Contato from './pages/contato'
import Detalhes from './pages/detalhes'
import Filme from './pages/filmes'

function App ()  {
  return(
     <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Principal/>} />
                <Route path='/Sobre' element = {<Sobre/>} />
                <Route path='/Perfil/:nome' element = {<Perfil/>} />
                <Route path='*' element = {<NotFound/>} />


                <Route path='/inicio' element = {<Inicio/>} />
                <Route path='/contato' element = {<Contato/>} />
                <Route path='/detalhes' element = {<Detalhes/>} />
                <Route path='/filme/:id_filme' element = {<Filme/>} />
            </Routes>
        </BrowserRouter>
     </div>
  )
}

export default App;
