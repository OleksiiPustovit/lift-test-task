import React from 'react';
import './Menu.scss';

const Menu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <div className="menu__content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <p className='menu__text'>Coming soon</p>

      </div>
    </div>
  );
};

export default Menu;
