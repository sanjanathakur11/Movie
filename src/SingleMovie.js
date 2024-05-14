import React, {useState , useEffect} from 'react';
import { NavLink , useParams } from 'react-router-dom';

const SingleMovie = () => {
  const [movieData, setMovieData] = useState({}); // State to hold movie details
  const { id } = useParams(); // Get movie ID from URL params

  // Fetch movie details using the ID on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`);
      const data = await response.json();
      setMovieData(data);
    };
    fetchData();
  }, [id]);

  if (!movieData.Title) return <div>Loading...</div>; 

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movieData.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movieData.Title}</p>
          <p className=""></p>
          <p className="card-text">Actor: {movieData.Actors}</p>
          <p className="card-text">Date : {movieData.Released}</p>
          <p className="card-text">Genre : {movieData.Genre}</p>
          <p className="card-text">Director : {movieData.Director}</p>
          <p className="card-text">RunTime : {movieData.Runtime}</p>
          <p className="card-text">imdbRating : {movieData.imdbRating} / 10</p>
          <p className="card-text">Country : {movieData.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;