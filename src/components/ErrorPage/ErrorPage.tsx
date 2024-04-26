import React from 'react';
import './ErrorPage.scss';

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page">
      <img src='/images/img/error-img.png' alt="Error" className="error-page__image" />
      <div className="error-page__content">
        <h2 className="error-page__title">Oops, no movie found</h2>
      </div>
    </div>
  );
};

export default ErrorPage;
