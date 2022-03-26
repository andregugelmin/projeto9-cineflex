import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css";

function SeatsSelect() {
  const { sessionId } = useParams();

  const [session, setSession] = useState({});
  const [seats, setSeats] = useState([]);
  const [seatsSelected, setSelectedSeats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    cpf: '',
    seats: [],
    sessionId: 0
  });

	useEffect(() => {
		const requisition = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

		requisition.then(response => {
			setSession(response.data);
      setSeats(response.data.seats);
      setLoaded(true);
		});
	}, []);

  useEffect(() => {
    if(userInfo.seats.length > 0) {
            
      const requisition = axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, {
        ids: userInfo.seats,
        name: userInfo.name,
        cpf: userInfo.cpf
      });
      requisition.then(response => {
        navigate('/success', { state: userInfo });
      })

      requisition.catch(error => {
        alert(error.response.data.message);
      })
    }
  }, [userInfo]);

  function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

  function selectSeat(seat){
    if(seat.isAvailable){
      seatsSelected.includes(seat.id) ? setSelectedSeats(arrayRemove(seatsSelected, seat.id)) : setSelectedSeats([...seatsSelected, parseInt(seat.id)]);
        
    }else{
      alert('Seat not available');
    }
  }

  function bookSeats(event){
    event.preventDefault()
    
    if(seatsSelected.length > 0){
      setUserInfo({...userInfo, sessionId: session.id, seats: seatsSelected}); 
      
    }
    else{
      alert('Selecione pelo menos um assento');
    }    
  }

  

  return loaded ? (
      <div className="seats-select">
        <span className="page-title">Selecione o(s) assento(s)</span>
        <main>
          <div className="seats">
            {seats.map(seat => {
              let classSeat = "";
              seatsSelected.includes(seat.id) ? classSeat = "seat-selected" : !seat.isAvailable ? classSeat = "seat-unavailable" :  classSeat = "seat-available";
              return <span className={`seat ${classSeat}`} key={seat.id} onClick={()=>selectSeat(seat)}>{seat.name}</span>
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

          <form onSubmit={bookSeats}>
            <div className="customer-data">
              <div className="customer-name">
                <span>Nome do comprador: </span>
                <input required type="text" placeholder="Digite seu nome..." value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})}/>
              </div>
              <div className="customer-cpf">
                <span>CPF do comprador: </span>
                <input required type="number" placeholder="Digite seu CPF..." value={userInfo.cpf} onChange={e => setUserInfo({...userInfo, cpf: e.target.value})}/>
              </div>
            </div>

            <button type="submit">Reservar assento(s)</button>
          </form>  

        </main>

        <footer>
          <div className="footer-poster">
            <img src={session.movie.posterURL} alt={session.title}/>            
          </div>
          <div className="footer-info">
            <span>{session.movie.title}</span>
            <span>{session.day.weekday} - {session.name}</span>
          </div>
          
        </footer>
      </div>
    
  ) : (<></>)
}

export default SeatsSelect;