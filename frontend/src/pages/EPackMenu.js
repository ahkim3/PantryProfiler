import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './style/Menu.css';

const EPackMenu = () => {
    return (
    <div>
        <NavBar />

        <div class="title">
            <h1>Emergency Food Pack Menu</h1>
        </div>

        <div class="dynamic-box">
            <div class="epack-button-pantry">
                <Link to="/pages/EPackLocations">
                    <button class="button-p">E-Pack Locations</button>
                </Link>
                <Link to="/pages/EPackNotifications">
                    <button class="button-p">E-Pack Notifications</button>
                </Link>
                <Link to="/pages/EPackUpdate">
                    <button class="button-p">Update E-Packs</button>
                </Link>
        </div>
        </div>
        </div>
    );
};

export default EPackMenu;