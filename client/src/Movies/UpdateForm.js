import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const UpdateForm = props => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialForm);
  const { id } = useParams();

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        // res.data
        console.log(res.data)
        setMovie(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  console.log(movie.title)

  if (!props.movieList.length || !movie) {
    return <h2>Loading movie .....</h2>
  }

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        // res.data
        setMovie(res.data);
        push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='save-wrapper'>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
