import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css';
import api from "./services/api";

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function hendleSearch() {
    if (input === '') {
      alert('Preencha algum CPF')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch {
      alert('Ops! Erro ao procurar esse CPF')
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
      {Object.keys(cep).length > 0 && (
        <main className="main">
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
