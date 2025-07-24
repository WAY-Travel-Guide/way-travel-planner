// src/components/StartForm/StepsArray.jsx
import React from "react";
import { DefaultInput } from '../../shared';
import { DefaultButton } from '../../shared';
import { ToHomeButton } from "../../shared";

import { MapConstructor } from '../mapView/';  // <-- импортируем ваш виджет


import "./StepsArray.css";

const steps = [
    {
        id: 0,
        content: (
        <div className="step-form">
            <div className='step-title'>НАЧНЕМ ПУТЕШЕСТВИЕ</div>
            <div className='step-description'>
            Наш сервис поможет составить маршрут, на основе Ваших предпочтений,
            бюджета и количества дней отдыха. Мы ценим каждого нашего пользователя
            и заботимся о Вашем комфорте, поэтому также учитываем индивидуальные особенности
            </div>
            <div className="step-button">
                <DefaultButton style={{
                    onClick: {},
                    bgColor: "#B95700",
                    borderColor: "#B95700",
                    textColor: "#ffffff",
                    textColorBefore: "#B95700",
                }}>
                    Маршрут
                </DefaultButton>
            </div>
            <div className="step-bottom-text">
            Команда «WAY» желает Вам хорошего отдыха!
            </div>
        </div>
        )
    },
    {
        id: 1,
        content: (
        <MapConstructor />
        )
    },
    // …можно добавить ещё шаги
];

export default steps;
