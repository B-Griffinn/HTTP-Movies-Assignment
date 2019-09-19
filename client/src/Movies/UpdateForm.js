import React, { useState } from 'react';
import axios from 'axios';

// Create Placeholder for our initial movie obj --> start as an empty key-val-pair
const defaultMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

// Define/Declare our functional component
const UpdateForm = (props) => {

// set our initial State to our inital movie obj (defaultMovie)
const [movie, setMovie] = useState(defaultMovie);

// Handler fns

    // convert id and metascore into a number
  const handleChange = e => {
    let value = e.target.value;
    if (e.target.name === "id") {
      value = parseInt(value, 10);
    } else if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMovie((movie.stars = movie.stars.split(" ")));

    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(defaultMovie);
        props.history.push("/movies");
      });
  };

    return (
        <div className="updated-movie">
            <h2>Update a Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='number'
                    name='id'
                    placeholder='Enter a New ID'
                    value={props.match.params.id}
                    onChange={handleChange}
                />

                <input
                    type='text'
                    name='title'
                    placeholder='Enter a New Movie Title'
                    value={movie.title}
                    onChange={handleChange}
                />

                <input
                    type='text'
                    name='director'
                    placeholder='Enter a New Movie Director'
                    value={movie.director}
                    onChange={handleChange}
                />

                <input
                    type='number'
                    name='metascore'
                    placeholder='Enter a New Movie Metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />

                <input
                    type='text'
                    name='stars'
                    placeholder='Enter the Movies Stars'
                    value={movie.stars}
                    onChange={handleChange}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateForm;