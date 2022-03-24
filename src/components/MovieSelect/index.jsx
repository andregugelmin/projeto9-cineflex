import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css";

function MovieSelect() {
  const [movies, setMovies] = useState([]);

	useEffect(() => {
		const requisition = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		requisition.then(response => {
			setMovies(response.data);
		});
	}, []);

  
  console.log(movies);

  return (
      <div className="movie-select">
        <span className="page-title">Selecione o filme</span>
        <main>
          {movies.map(movie => {
            return <Link to={`/sessions/${movie.id}`} key={movie.id}>
              <div className="poster">
                <img src={movie.posterURL} alt={movie.title}/>
              </div>
            </Link>})}
        </main>
        
      </div>
    
  )
}

export default MovieSelect;