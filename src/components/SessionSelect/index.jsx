import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css";

function SessionSelect() {
  const { movieId } = useParams();

  const [sessions, setSessions] = useState([]);
  const [days, setDays] = useState([]);
  

	useEffect(() => {
		const requisition = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);

		requisition.then(response => {
			setSessions(response.data);
      setDays(response.data.days);
		});
	}, []);
  
  return (
      <div className="session-select">        
        <span className="page-title">Selecione o horário</span>
        <main>
        {days.map(day =>{
          const showtimes = day.showtimes;
          return <div className="day" key={day.id}>
              <span>{day.weekday} - {day.date}</span>
              <div className="session">
                {showtimes.map(showtime => {
                return <Link to={`/seats/${showtime.id}`} key={showtime.id}>
                  <button key={showtime.id}>{showtime.name}</button>
                </Link>})}
              </div>
            </div>
        })}
        </main>
        <footer>
          <div className="footer-poster">
            <img src={sessions.posterURL} alt={sessions.title}/>            
          </div>
          <span>{sessions.title}</span>
        </footer>
      </div>
    
  )
}

export default SessionSelect;