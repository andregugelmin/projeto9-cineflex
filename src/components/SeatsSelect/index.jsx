import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css";

function SeatsSelect() {
  const { sessionId } = useParams();
  const [loaded, setLoaded] = useState(false);

  const [customersInfo, setCustomersInfo] = useState([]);
  const [seatsSelected, setSelectedSeats] = useState([]);

  const [session, setSession] = useState({});
  const [seats, setSeats] = useState([]);
  
  
  const navigate = useNavigate();
  
  const [usersInfo, setUsersInfo] = useState({
    compradores: [],
    seats: [],
    sessionId: sessionId
  });

	useEffect(() => {
		const requisition = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

		requisition.then(response => {
			setSession(response.data);
      setSeats(response.data.seats);
      setLoaded(true);
		});
	}, []);

  function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
  }

  function selectSeat(seat){
    let aux = [...customersInfo];
    let i = 0;

    if(seat.isAvailable){
      if(seatsSelected.includes(seat.id)){
        console.log('contem');
        while(aux[i].idAssento!=seat.id){
          i++;
        }
        if(aux[i].nome != "" || aux[i].cpf != ""){
          if (window.confirm("Tem certeza?")) {
            setSelectedSeats(arrayRemove(seatsSelected, seat.id));        
            aux = arrayRemove(aux, aux[i]);
          }
        }
        else{
          setSelectedSeats(arrayRemove(seatsSelected, seat.id));        
          aux = arrayRemove(aux, aux[i]);
        }        
      }
      else{
        setSelectedSeats([...seatsSelected, parseInt(seat.id)]);
        aux.push({idAssento:seat.id, nome: "", cpf: ""});
      }
      setCustomersInfo([...aux]);  
      console.log(seatsSelected);
    }else{
      alert('Assento não disponível');
    }
  }

  function bookSeats(event){
    event.preventDefault();
    
    if(seatsSelected.length > 0){
      setUsersInfo({...usersInfo, seats: seatsSelected, compradores: customersInfo}); 
    }
    else{
      alert('Selecione pelo menos um assento');
    }    
  }

  useEffect(() => {
    if(seatsSelected.length > 0) {            
      const requisition = axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, {
        ids: seatsSelected,
        compradores: customersInfo
      });
      requisition.then(response => {
        navigate('/success', { state: usersInfo });
      })

      requisition.catch(error => {
        alert(error.response.data.message);
      })
    }
  }, [usersInfo]);

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
            {customersInfo.map((customer, index) => <UserData key={index} index={index} customersInfo={customersInfo} setCustomersInfo={setCustomersInfo}/>)}            

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

function UserData(props){
  const {index, customersInfo, setCustomersInfo} = props;
  function updateName(event){
    let aux = [...customersInfo];
    aux[index].nome = event.target.value;
    setCustomersInfo(aux);
  }

  function updateCPF(event){
    let aux = [...customersInfo];
    aux[index].cpf = event.target.value;
    setCustomersInfo(aux);
  }

  return(
    <div className="customer-data">
      <p>Assento {customersInfo[index].idAssento%50}</p>
      <div className="customer-name">
        <span>Nome do comprador: </span>
        <input required type="text" placeholder="Digite seu nome..." value={customersInfo[index].nome} onChange={e => updateName(e)}/>
      </div>
      <div className="customer-cpf">
        <span>CPF do comprador: </span>
        <input required type="number" placeholder="Digite seu CPF..." value={customersInfo[index].cpf} onChange={e => updateCPF(e)}/>
      </div>
    </div>
  )
}

export default SeatsSelect;