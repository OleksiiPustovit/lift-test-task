import React from 'react';
import './Header.scss';

interface HeaderProps {
  progress: number;
  onMenuOpen: () => void;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ progress, onMenuOpen, onBack }) => {
  return (
    <header className="header">
      <div className="header__background">
        <div className="header__content">
          <button className="header__back-btn" onClick={onBack}>
            &lt;
          </button>
          <div className="header__progress-info">
            <span>{progress}%</span>
            <button className="header__menu-btn" onClick={onMenuOpen}>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
            </button>
          </div>
        </div>
        <div className="header__progress">
          <div className="header__progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;