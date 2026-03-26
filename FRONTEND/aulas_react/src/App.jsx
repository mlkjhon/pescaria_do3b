import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Principal from './pages/principal'
import Sobre from './pages/sobre'
import NotFound from './pages/notfound'
import Perfil from './pages/Perfil'

function App ()  {
  return(
     <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Principal/>} />
                <Route path='/Sobre' element = {<Sobre/>} />
                <Route path='/Perfil/:nome' element = {<Perfil/>} />
                <Route path='*' element = {<NotFound/>} />
            </Routes>
        </BrowserRouter>
     </div>
  )
}

export default App;
