import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './style/Menu.css';

const EPackMenu = () => {
    return (
    <div>
        <NavBar />

        <div className="title">
            <h1>Emergency Food Pack Menu</h1>
        </div>

        <div className="dynamic-box">
            <div className="epack-button-pantry">
                <Link to="/pages/EPackLocations">
                    <button className="button-p">E-Pack Locations</button>
                </Link>
                <Link to="/pages/EPackNotifications">
                    <button className="button-p">E-Pack Notifications</button>
                </Link>
                <Link to="/pages/EPackUpdate">
                    <button className="button-p">Update E-Packs</button>
                </Link>
        </div>
        </div>
        </div>
    );
};

export default EPackMenu;