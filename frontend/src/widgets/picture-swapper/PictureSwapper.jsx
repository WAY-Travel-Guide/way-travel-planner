/**
 * @fileoverview
 * Карусель картинок и информации (PictureSwapper) для страниц авторизации, регистрации и профиля.
 * Позволяет листать слайды с фотографиями, описаниями и названиями городов.
 * Добавляет анимацию и визуальные стрелки для навигации.
 *
 * @description
 * PictureSwapper — React-компонент, реализующий слайдер (carousel) с изображениями, подписями и описаниями.
 * Предназначен для визуального оформления страниц и привлечения внимания пользователя.
 * Слайды пролистываются стрелками, плавно анимируются при смене.
 * В верхней части есть быстрые ссылки: "Отзывы", "Контакты", "Помощь".
 *
 * @module PictureSwapper
 */

import React, { useState, useRef, useEffect } from "react";
import "./PictureSwapper.css";

import LeftArrow from './left.svg?react';
import RightArrow from './right.svg?react';

/**
 * Список слайдов для карусели.
 * @type {Array<{city: string, label: string, description: string, image: string}>}
 */
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

/**
 * Карусель с картинками, подписями и стрелками навигации.
 *
 * @returns {JSX.Element} Вёрстка слайдера с анимацией, стрелками и подписями.
 */
const PictureSwapper = function () {
    /** @type {[number, Function]} Индекс текущего слайда */
    const [index, setIndex] = useState(0);
    /** @type {[string, Function]} Направление анимации ("left" или "right") */
    const [direction, setDirection] = useState("right");
    /** @type {[number, Function]} Ключ для fade-анимации */
    const [fadeKey, setFadeKey] = useState(0);
    /** @type {React.RefObject<HTMLDivElement>} */
    const formRef = useRef(null);

    /**
     * Переключает на следующий слайд.
     */
    const nextSlide = () => {
        setDirection("right");
        setIndex((prev) => (prev + 1) % slides.length);
        setFadeKey(prev => prev + 1);
    };

    /**
     * Переключает на предыдущий слайд.
     */
    const prevSlide = () => {
        setDirection("left");
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setFadeKey(prev => prev + 1);
    };

    /** @type {{city: string, label: string, description: string, image: string}} */
    const current = slides[index];

    return (
        <div className="form">
            {/* Верхние быстрые ссылки */}
            <div className="top-links">
                <span>Отзывы →</span>
                <span>Контакты →</span>
                <span>Помощь →</span>
            </div>

            {/* Окно слайдера с плавным переходом между слайдами */}
            <div className="carousel-window">
                <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
                {slides.map((slide, i) => (
                    <div className="carousel-slide" key={i} style={{ backgroundImage: `url(${slide.image})` }} />
                ))}
                </div>
            </div>

            {/* Содержимое текущего слайда с fade-анимацией */}
            <div className="slide-content fade-in" key={fadeKey}>
                <div className="label">{current.label}</div>
                <div className="description">{current.description}</div>
                <div className="city">{current.city}</div>
            </div>

            {/* Стрелки навигации */}
            <div className="arrows">
                <LeftArrow className="arrow" onClick={prevSlide} />
                <RightArrow className="arrow" onClick={nextSlide} />
            </div>
        </div>
    );
};

export { PictureSwapper };