import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './style/Menu.css';

const MainMenu = () => {
    return (
    <div>
        <NavBar />
        <div class="title">
            <h1>Main Menu</h1>
        </div>
        
        <div class="dynamic-box">
            <div class="main-button-pantry">
                <Link to="./pages/PantryMenu">
                <button class="button-p">Pantry</button>
                </Link>
                <Link to="./pages/EPackMenu">
                <button class="button-p">Emergency Packs</button>
                </Link>
            </div>
            </div>

            
            <div class="request-epack">
                <Link to="./pages/RequestEPack">
                <button class="button-request">Request E-Pack</button>
                </Link>
            </div>
        </div>
);
};
export default MainMenu;