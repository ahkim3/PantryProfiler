import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import EPackMenu from './pages/EPackMenu';
import PantryMenu from './pages/PantryMenu';
import EPackLocations from './pages/EPackLocations';
import EPackNotifications from './pages/EPackNotifications';
import EPackUpdate from './pages/EPackUpdate';
import PantryCurrentInventory from './pages/PantryCurrentInventory';
import PantryLowInStock from './pages/PantryLowInStock';
import PantryUpdate from './pages/PantryUpdate';
import RequestEPack from './pages/RequestEPack';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/pages/EPackMenu" element={<EPackMenu />} />
        <Route path="/pages/PantryMenu" element={<PantryMenu />} />

        <Route path="/pages/EPackLocations" element={<EPackLocations />} />
        <Route path="/pages/EPackNotifications" element={<EPackNotifications />} />
        <Route path="/pages/EPackUpdate" element={<EPackUpdate />} />

        <Route path="/pages/PantryCurrentInventory" element={<PantryCurrentInventory />} />
        <Route path="/pages/PantryLowInStock" element={<PantryLowInStock />} />
        <Route path="/pages/PantryUpdate" element={<PantryUpdate />} />

        <Route path="/pages/RequestEPack" element={<RequestEPack />} />

      </Routes>
    </Router>
  );
};

export default App;