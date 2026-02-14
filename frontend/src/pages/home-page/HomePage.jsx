import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HomeWidget,Header,TileBackground,CaterpillarSlider} from '../../widgets/';
import "./HomePage.css";
import {slides} from './slides.jsx';
import { Footer } from '../../widgets/footer/Footer.jsx';

const HomePage = function ({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">

        {/* Хедер страницы */}
        <Header />

        {/* Основной слайдер с популярными направлениями */}
        <TileBackground slides={slides} />
        <Footer/>

        {/* Гусеница с тремя слайдами 
        <CaterpillarSlider slides={slides} />*/}
      </div>

      
    </>
  );
};

export { HomePage };
