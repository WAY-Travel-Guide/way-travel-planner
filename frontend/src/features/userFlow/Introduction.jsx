import React from "react";
import { DefaultButton } from '../../shared';
import "./Introduction.css";

const Introduction = () => {
    return (
            <div className="introduction-form">
                <div className='introduction-title'>НАЧНЕМ ПУТЕШЕСТВИЕ</div>
                <div className='introduction-description'>
                    Наш сервис поможет составить маршрут, на основе Ваших предпочтений,
                    бюджета и количества дней отдыха. Мы ценим каждого нашего пользователя
                    и заботимся о Вашем комфорте, поэтому также учитываем индивидуальные особенности
                </div>
                <div className="introduction-button">
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
                <div className="introduction-bottom-text">
                    Команда «WAY» желает Вам хорошего отдыха!
                </div>
            </div>
        )
};

export { Introduction };
