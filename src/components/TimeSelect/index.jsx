import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css";

function TimeSelect() {
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
  
  console.log(days);
  
  return (
      <div className="time-select">        
        <span className="page-title">Selecione o horário</span>
        <main>
        {days.map(day =>{
          const showtimes = day.showtimes;
          return <div className="day" key={day.id}>
              <span>{day.weekday} - {day.date}</span>
              <div className="session">
                {showtimes.map(showtime => <button key={showtime.id}>{showtime.name}</button>)}
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

export default TimeSelect;