import React from 'react';
import './style/NavBar.css'; 
import logo from '../logo.svg'


const NavBar = () => {
  return (
    <nav className="header2">
        <div className='svg-container'>
            <img className='svg' src={logo} alt="logo"/>
        </div>
    </nav>

  );
};

export default NavBar;