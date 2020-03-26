import React, {useState} from 'react';
import './styles.css';
import LogoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      history.push('/profile');
    } catch(err) {
      alert('Erro ao cadastrar o caso, tente novamente');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />
          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva seu caso detalhadamente para encontrar u herói para resolver isso.</p>

          <Link className="back-link" exact to="/profile">
                  <FiArrowLeft size={16} color="#E02041" />
                  Voltar para Home
                </Link>
        </section>
        
        <form>
          <input 
            placeholder="Título do Caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Descrição" 
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
           
          <input 
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
  
          <button onClick={handleNewIncident}className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}