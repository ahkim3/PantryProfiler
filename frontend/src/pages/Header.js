import React from 'react';
import './style/NavBar.css'; 
import mizzou from '../MU_UniversitySig_horiz_RGB_REV.png'
import {Link} from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="header">
        <div className='png-container'>
            <img className='png' src={mizzou} alt="Mizzou"/>
        </div>
        <Link to="../SignOut" className="signout-button">
            Sign Out
        </Link>
    </nav>

  );
};

export default NavBar;