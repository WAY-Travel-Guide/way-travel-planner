/**
 * @fileoverview
 * Плиточка с каруселью картинок и информации (TileBackground) для home-page.
 * Позволяет листать слайды с фотографиями и названиями городов.
 * Добавляет анимацию и визуальные стрелки для навигации.
 *
 * @description
 * TileBackground — React-компонент, реализующий слайдер (carousel) с изображениями, подписями и описаниями.
 * Предназначен для визуального оформления страниц и привлечения внимания пользователя.
 * Слайды пролистываются стрелками, плавно анимируются при смене.
 * В верхней части есть быстрые ссылки: "Отзывы", "Контакты", "Помощь".
 * Реализована карулесь в формате "плиточки".
 * @module PictureSwapper
 */

import React, { useState, useRef, useEffect } from "react";
import "./TileBackground.css";
import BackgroundImage from "../../../public/images/bg1.jpg";

/**
 * Список слайдов для карусели.
 * @type 
 */
const TileBackground = ()=>{return (
<div className = "tilebackground-form">
    <img src={BackgroundImage} alt="Background" className="background-image" />
</div>
)};
export {TileBackground};