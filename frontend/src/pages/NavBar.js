import React from 'react';
import './style/NavBar.css'; // Import CSS for styling
import logo from '../logo.svg';

const NavBar = () => {
  return (
    <nav className="navbar">
        <div class='svg-container'>
            <img src={logo} alt="Logo"/>
        </div>
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item dropdown">
          <a href="/pages/EPackMenu">Emergency Packs</a>
          <div className="dropdown-content">
            <a href="/pages/EPackLocations">E-Pack Locations</a>
            <a href="/pages/EPackNotifications">E-Pack Notifications</a>
            <a href="/pages/EPackUpdate">Update E-Pack</a>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a href="/pages/PantryMenu">Pantry</a>
          <div className="dropdown-content">
            <a href="/pages/PantryLowInStock">Low In Stock </a>
            <a href="/pages/PantryCurrentInventory">Current Inventory</a>
            <a href="/pages/PantryUpdate">Update Inventory</a>
            <a href="/pages/PantryTrending">Trending Items</a>
          </div>
        </li>
      </ul>
    </nav>

  );
};

export default NavBar;