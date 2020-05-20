import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./MovieCard";

import { useParams, useHistory } from 'react-router-dom';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (id) => {
    
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        console.log(res.data)
        push('/')
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="update-button" onClick={() => push(`/update-movie/${movie.id}`)}>
        Update
      </div>

      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
      
    </div>
  );
}

export default Movie;
