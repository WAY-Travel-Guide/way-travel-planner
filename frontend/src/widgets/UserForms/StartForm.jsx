import React from 'react';
import Input from '../../shared/ui/Input/Input.jsx';
import OrangeButton from '../../shared/ui/OrangeButton/OrangeButton.jsx';
import ToHomeLogoButton from "../ReturnToHome/ToHome.jsx";
import './StartForm.css';

const StartForm = function ({ userName }) {
    return (
        <div className="start-form">
            <ToHomeLogoButton />
            <div className='start-title'>НАЧНЕМ ПУТЕШЕСТВИЕ</div>
            <div className='start-desciption'>
                Наш сервис поможет составить маршрут, на основе Ваших предпочтений, бюджета и количества дней отдыха. Мы ценим каждого нашего пользователя и заботимся о Вашем комфорте, поэтому также учитываем индивидуальные особенности
            </div>
            <OrangeButton style={{ }}>
                Составить маршрут
            </OrangeButton>
            <div className="start-bottom-text">Команда «WAY» желает Вам хорошего отдыха!</div>
        </div>
    );
};

export default StartForm;
