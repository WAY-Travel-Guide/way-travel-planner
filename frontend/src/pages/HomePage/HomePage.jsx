import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MapWidget from '../../widgets/MapWidget';
import HomeWidget from '../../widgets/HomeForm/HomeWidget.jsx';
import "./HomePage.css";

const HomePage = function ({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <HomeWidget user={user} onLogout={onLogout}/>
    </div>
  );
}

export default HomePage;
