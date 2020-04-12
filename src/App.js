import React, { useState, useEffect } from "react";

import api from './services/api'
import "./styles.css";

function App() {
  const [repositores, setRepositores] = useState([]);
  
    useEffect(()=>{
     api.get('repositories').then(res =>{
      setRepositores(res.data)
     }) 
    },[])
  
  async function handleAddRepository() {
    api.post('repositories',{
      url: "https://github.com/raihrd",
      title: "Teste",
      techs: ["ReactJS", "Nodejs"],
    }).then(res => {
      setRepositores([...repositores,res.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositores(repositores.filter(repo => repo.id !== id))
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositores.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
