import React, { useState, useEffect } from 'react';
import './Survey.scss';

interface SurveyProps {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
}

interface Genre {
  id: number;
  name: string;
  image: string;
}

const Survey: React.FC<SurveyProps> = ({ setProgress, onSubmit }) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(() => localStorage.getItem('selectedGenre'));
  const [submitted, setSubmitted] = useState(false);

  const genres: Genre[] = [
    { id: 1, name: 'Drama', image: '/images/icons/drama.png' },
    { id: 2, name: 'Comedy', image: '/images/icons/comedy.png' },
    { id: 3, name: 'Action', image: '/images/icons/action.png' },
    { id: 4, name: 'Thriller', image: '/images/icons/thriller.png' },
    { id: 5, name: 'Science fiction', image: '/images/icons/science.png' },
  ];
  
  useEffect(() => {
    localStorage.setItem('selectedGenre', selectedGenre || '');
  }, [selectedGenre]);

  const handleSubmit = () => {
    if (selectedGenre && !submitted) {
      setProgress((prevProgress) => Math.min(prevProgress + 33, 100));
      setSubmitted(true);
      onSubmit();
    }
  };

  const handleGenreSelect = (genreName: string) => {
    setSelectedGenre(genreName);
    setProgress((prevProgress) => (prevProgress === 0 ? prevProgress + 33 : prevProgress));
  };

  return (
    <div className="survey">
      <h2 className="survey__title">Your favorite movie genre?</h2>
      <div className="survey__options">
        {genres.map((genre) => (
          <label key={genre.id} className={`survey__option ${selectedGenre === genre.name ? 'selected' : ''}`}>
            <div className="survey__details">
              <img src={genre.image} alt={genre.name} className="survey__image" />
              <span className="survey__genre">{genre.name}</span>
            </div>
            <input
              type="checkbox"
              checked={selectedGenre === genre.name}
              onChange={() => handleGenreSelect(genre.name)}
            />
          </label>
        ))}
      </div>
      <button
        className="survey__submit"
        disabled={!selectedGenre || submitted}
        onClick={handleSubmit}
        style={{ backgroundColor: !selectedGenre ? 'rgba(64, 188, 163, 0.5)' : 'rgb(64, 188, 163)' }}
      >
        Continue
      </button>
    </div>
  );
};

export default Survey;