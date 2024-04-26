import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';


interface MovieListProps {
  results: { Title: string; Year: string; Poster: string }[];
  onComplete: () => void;
}

const MovieList: React.FC<MovieListProps> = ({ results, onComplete  }) => {
  return (
    <div className="movie-list">
      <ul className='movie-list__list'>
        {results.map((movie, index) => (
          <li className='movie-list__item' key={index}>
            <MovieCard title={movie.Title} year={movie.Year} poster={movie.Poster} />
          </li>
        ))}
      </ul>
      <button
        className='movie-list__button'
        onClick={onComplete}
      >
        Complite
      </button>
    </div>
  );
};

export default MovieList;
