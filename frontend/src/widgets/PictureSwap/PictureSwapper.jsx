import React, { useState, useRef, useEffect } from "react";

import "./PictureSwapper.css";

import LeftArrow from "../../assets/left.svg";
import RightArrow from "../../assets/right.svg";

const slides = [
    {
        city: "Москва",
        label: "Популярно",
        description: "5-дневный гид",
        image: "/images/advert1.jpg"
    },
    {
        city: "Санкт-Петербург",
        label: "Историческое",
        description: "3-дневный маршрут",
        image: "/images/advert2.jpg"
    },
    {
        city: "Казань",
        label: "Национальное",
        description: "Уикенд в столице Татарстана",
        image: "/images/advert3.jpg"
    }
];

const PictureSwapper = function () {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState("right");
    const [fadeKey, setFadeKey] = useState(0);
    const formRef = useRef(null);

    const nextSlide = () => {
        setDirection("right");
        setIndex((prev) => (prev + 1) % slides.length);
        setFadeKey(prev => prev + 1);
    };

    const prevSlide = () => {
        setDirection("left");
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setFadeKey(prev => prev + 1);
    };

    const current = slides[index];

    return (
        <div className="form">
            <div className="top-links">
                <span>Отзывы →</span>
                <span>Контакты →</span>
                <span>Помощь →</span>
            </div>

            <div className="carousel-window">
                <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
                {slides.map((slide, i) => (
                    <div className="carousel-slide" key={i} style={{ backgroundImage: `url(${slide.image})` }} />
                ))}
                </div>
            </div>

            <div className="slide-content fade-in" key={fadeKey}>
                <div className="label">{current.label}</div>
                <div className="description">{current.description}</div>
                <div className="city">{current.city}</div>
            </div>

            <div className="arrows">
                <img src={LeftArrow} className="arrow" onClick={prevSlide} />
                <img src={RightArrow} className="arrow" onClick={nextSlide} />
            </div>
        </div>
    );
};

export default PictureSwapper;
