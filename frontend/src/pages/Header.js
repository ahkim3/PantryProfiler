import React from 'react';
import './style/NavBar.css'; 
import mizzou from '../MU_UniversitySig_horiz_RGB_REV.png'

const NavBar = () => {
  return (
    <nav className="header">
        <div className='png-container'>
            <img className='png' src={mizzou} alt="Mizzou"/>
        </div>
    </nav>

  );
};

export default NavBar;