import UseState, { useState } from "react";
import { DefaultButton, DefaultSwitcher } from '../../shared';
import "./Introduction.css";

const Introduction = () => {
    const [onChange, setChange] = useState(false);

    return (
            <div className="introduction-form">
                <div className='introduction-title'>НАЧНЕМ ПУТЕШЕСТВИЕ</div>
                <div className='introduction-description'>
                    Наш сервис поможет составить маршрут, на основе Ваших предпочтений,
                    бюджета и количества дней отдыха. Мы ценим каждого нашего пользователя
                    и заботимся о Вашем комфорте, поэтому также учитываем индивидуальные особенности
                </div>
                <div className="introduction-button">
                    {/* Переопределение стиля стандартной кнопки*/}
                    <DefaultButton style={{
                        onClick: {},
                        bgColor: "#B95700",
                        borderColor: "#B95700",
                        textColor: "#ffffff",
                        textColorBefore: "#B95700",
                    }}>
                        Маршрут
                    </DefaultButton> {/*Кнопка маршрут*/}





                    <DefaultSwitcher
                        checked = {onChange}
                        onChange={(e) => setChange(e.target.checked)} 
                        style={{
                            onBg: '#ff4444',
                            offBg: '#666',
                            handleSize: 12,
                            width: 60,
                            height: 35
                        }}
                    >
                    </DefaultSwitcher>
                </div>
                <div className="introduction-bottom-text">
                    Команда «WAY» желает Вам хорошего отдыха!
                </div>
            </div>
        )
};

export { Introduction };
