import React, { useState } from 'react';
import './QueryForm.scss';
import MovieList from '../MovieList/MovieList';
import ErrorPage from '../ErrorPage/ErrorPage';

interface QueryFormProps {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (results: any) => void;
  onComplete: () => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ setProgress, onSubmit, onComplete }) => {
  const [query, setQuery] = useState('');
  const [inputError, setInputError] = useState('');
  const [serverError, setServerError] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>//?]+/;
    setInputError(regex.test(value) ? 'Special characters are not allowed' : '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== '' && !inputError) {
      setFetching(true);
      fetch(`https://www.omdbapi.com/?s=${query}&apikey=60a5ea02`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.Response === 'False' && data.Error === 'Movie not found!') {
            setServerError('Movie not found!');
          } else if (data.Response === 'False' && data.Error === 'Too many results.') {
            setServerError('Too many results.');
          } else {
            setSearchResults(data.Search || []);
            onSubmit(data);
          }
        })
        .catch((error) => {
          console.error('There was a problem with your fetch operation:', error);
          if (error.message === 'Network response was not ok') {
            setServerError('There was an error processing your request');
          } else {
            setServerError('Unknown error occurred');
          }
        })
        .finally(() => {
          setFetching(false);
        });
    }
  };

  if (serverError) {
    return <ErrorPage />;
  }

  if (fetching) {
    return <div className="loader"></div>;
  }

  if (searchResults.length > 0) {
    return <MovieList onComplete={onComplete} results={searchResults} />;
  }

  const handleContinueClick = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 34, 100));
  };

  return (
    <div className="query-form">
      <div className="query-form__wrapper">
        <h2 className="query-form__title">Enter movie title</h2>
        <form className="query-form__form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Movie title here"
            className={`query-form__input ${inputError ? 'error' : ''}`}
          />
          {inputError && <p className="query-form__error">{inputError}</p>}
          <button
            type="submit"
            className={`query-form__submit ${query.trim() === '' || !!inputError ? 'disabled' : ''}`}
            disabled={query.trim() === '' || !!inputError}
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueryForm;
