import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css";

function SeatsSelect() {
  const { sessionId } = useParams();

  const [session, setSession] = useState([]);
  const [seats, setSeats] = useState([]);
  

	useEffect(() => {
		const requisition = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

		requisition.then(response => {
			setSession(response.data);
      setSeats(response.data.seats);
		});
	}, []);

  return (
      <div className="seats-select">
        <span className="page-title">Selecione o(s) assento(s)</span>
        <main>
          <div className="seats">
            {seats.map(seat => {
              let classSeat = "";
              seat.isAvailable ? classSeat = "seat-available" : classSeat = "seat-unavailable";
              return <span className={`seat ${classSeat}`} key={seat.id}>{seat.name}</span>
            })}
          </div>

          <div className="icons-legends">
            <div className="icon-legend selected-legend">
              <span className="seat-selected"></span>
              <p>Selecionado</p>
            </div>
            <div className="icon-legend available-legend">
              <span className="seat-available"></span>
              <p>Disponível</p>
            </div>
            <div className="icon-legend unavailable-legend">
              <span className="seat-unavailable"></span>
              <p>Indisponível</p>
            </div>
            
          </div>

          <div className="customer-data">
            <div className="customer-name">
              <span>Nome do comprador: </span>
              <input type="text" placeholder="Digite seu nome..."/>
            </div>
            <div className="customer-cpf">
              <span>CPF do comprador: </span>
              <input type="text" placeholder="Digite seu CPF..."/>
            </div>
          </div>

          <button>Reservar assento(s)</button>

        </main>
      </div>
    
  )
}

export default SeatsSelect;