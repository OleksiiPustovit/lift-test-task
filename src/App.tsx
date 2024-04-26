import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/main.scss';
import Header from './components/Header/Header';
import Survey from './components/Survey/Survey';
import QueryForm from './components/QueryForm/QueryForm';
import Menu from './components/Menu/Menu';
import {Helmet} from "react-helmet";

function App() {
  const [progress, setProgress] = useState(() => {
    const storedProgress = localStorage.getItem('progress');
    const parsedProgress = storedProgress ? Number(storedProgress) : 0;
    return parsedProgress > 0 && parsedProgress <= 33 ? parsedProgress : parsedProgress === 0 ? 0 : 33;
  });
  const [showSurvey, setShowSurvey] = useState(true);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('progress', String(progress));
  }, [progress]);

  const handleBack = () => {
    setProgress((prevProgress) => prevProgress !== 0 ? 33 : 0);
    setShowSurvey(true);
    setShowQueryForm(false);
  };
  
  const handleSurveySubmit = () => {
    setShowQueryForm(true);
  };

  const handleComplete = () => {
    localStorage.removeItem('selectedGenre');
    setProgress(0);
    setShowSurvey(true);
    setShowQueryForm(false);
  };

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lift test task</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Lift test task" />
      </Helmet>
      <Header progress={progress} onMenuOpen={handleMenuOpen} onBack={handleBack} />
      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />}
      {showSurvey && !showQueryForm && <Survey setProgress={setProgress} onSubmit={handleSurveySubmit} />}
      {showQueryForm && <QueryForm onComplete={handleComplete} setProgress={setProgress} onSubmit={() => {}} />} {/* Додано пусту функцію для onSubmit */}
    </div>
  );
}

export default App;
