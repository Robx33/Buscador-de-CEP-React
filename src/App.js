import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css';
import api from "./services/api";

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

// Por estar buscando informação de uma Api a função se torna assincrona Async
  async function hendleSearch() {
    if (input === '') {
      alert('Preencha algum CEP!')
      return
    }
// O que eu quero fazer mas pode dar errado
    try {
      const response = await api.get(`${input}/json`) // Busca a informação digitada através da api
      setCep(response.data) // .data é onde mostra as informações dentro da api
      setInput('') // deixar o input vazio após a busca

    } catch {
      alert('Ops! Erro ao procurar esse CEP')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          value={input}
          type="text"
          placeholder="Digite o seu cep ..."
          onChange={(e) => setInput(e.target.value)}
        />


        <button className="buttonSearch">
          <FiSearch size={25} color="#FFF" onClick={hendleSearch} />
        </button>

      </div> 
      {/* Verifica sem tem alguma coisa dentro do cep(input), se for true mostra o main se for false ele nao mostra nada */}
      {Object.keys(cep).length > 0 && (
        <main className="main">
          {/* As informações que a Api busca para mostrar na tela */}
          <h2>{cep.cep}</h2> 
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}- {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
