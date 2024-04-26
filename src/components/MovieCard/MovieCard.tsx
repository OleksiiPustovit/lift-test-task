import React from 'react';
import './MovieCard.scss';

interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, poster }) => {
  return (
    <div className="movie-card">
      <img className='movie-card__poster' src={poster} alt="Poster" />
      <h3 className='movie-card__title'>{title}</h3>
      <p className='movie-card__year'>{year}</p>
    </div>
  );
};

export default MovieCard;
