import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">Manan AI</div>
      <div className="user-profile">
        <span>{user.name}</span>
        <img 
          className="user-avatar" 
          src={user.photoUrl || '/default-avatar.png'} 
          alt={user.name} 
        />
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;
