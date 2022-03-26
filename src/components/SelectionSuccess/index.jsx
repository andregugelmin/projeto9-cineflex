import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


import "./style.css";

function SelectionSuccess() {  

  const location = useLocation();
  const {name, cpf, seats, sessionId} = location.state;
  console.log(name, cpf, seats, sessionId);
  const [session, setSession] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
		const requisition = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

		requisition.then(response => {
			setSession(response.data);
      console.log(session);
      setLoaded(true);
		});
	}, []);


  return !loaded ? (<></>) : (
    <div className="success-page">    
      <span>Pedido feito com sucesso!</span>
      <div className="info">
        <h2>Filme e sessão</h2>
        <p>{session.movie.title}</p>
        <p>{session.day.date} {session.name}</p>
      </div>
      <div className="info">
        <h2>Ingressos</h2>
        {seats.map(seat => <p key={seat}>Assento {seat%50}</p>)}
      </div>
      <div className="info">
        <h2>Comprador</h2>
        <p>Nome: {name}</p>
        <p>CPF: {cpf}</p>
      </div>
      <Link style={{textDecoration: 'none'}} to={`/`}><button>Voltar pra Home</button></Link>
    </div>

  )
}

export default SelectionSuccess;