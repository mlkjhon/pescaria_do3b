import './App.css'

export const App = () => {
  return (
    <div className='exercicio'>
      <h1>Dados do Aluno</h1> 
      <ul>
        <h3>Nome</h3>
        <li><p>Gustavo Henrique</p></li>
        <h3>RM</h3>
        <li><p>3148</p></li>
        <h3>Unidade Escolar</h3>
        <li><p>SESI Andradina-SP CE 025</p></li>
        <h3>Turma</h3>
        <li><p>3º B EM</p></li>
      </ul>
      <ul>
      <h3>Matérias</h3>
        <li>DEV Sistemas - SENAI</li>
        <li>Matemática</li>
        <li>Portugues</li>
        <li>Ciencias Humanas</li>
        <li>Ciencias da Natureza</li>
      </ul>

      <img src="https://assets.b9.com.br/wp-content/uploads/2015/08/kuat-gif.gif" alt="uau" />

    </div>
  )
}

export default App;