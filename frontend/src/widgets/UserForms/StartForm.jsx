/**
 * @fileoverview
 * Приветственная форма для старта работы с сервисом.
 * Показывает кнопки и описание, возвращает на главную через отдельный компонент.
 *
 * @description
 * StartForm — React-компонент с приветственным текстом, коротким описанием сервиса и кнопкой "Приступим".
 * Используется на странице пользователя для мотивации к началу работы с маршрутом.
 * Подключает кастомные кнопки и ссылку "На главную" через ToHomeLogoButton.
 *
 * @module StartForm
 */

import React from 'react';
import OrangeButton from '../../shared/ui/OrangeButton/OrangeButton.jsx';
import ToHomeLogoButton from "../ReturnToHome/ToHome.jsx";
import './StartForm.css';

/**
 * @typedef {Object} StartFormProps
 * @property {string} [userName] - Имя пользователя (опционально, может быть не использовано).
 */

/**
 * Приветственная форма для начала работы пользователя.
 *
 * @param {StartFormProps} props   - Свойства компонента (userName).
 * @returns {JSX.Element}          - Контейнер с приветственным текстом и кнопкой.
 */
const StartForm = function ({ userName }) {
    return (
        <div className="start-form">
            {/* Кнопка возврата на главную */}
            <ToHomeLogoButton />
            <div className='start-title'>НАЧНЕМ ПУТЕШЕСТВИЕ</div>
            <div className='start-desciption'>
                Наш сервис поможет составить маршрут, на основе Ваших предпочтений, бюджета и количества дней отдыха. Мы ценим каждого нашего пользователя и заботимся о Вашем комфорте, поэтому также учитываем индивидуальные особенности
            </div>
            <OrangeButton style={{ }}>
                Приступим
            </OrangeButton>
            <div className="start-bottom-text">Команда «WAY» желает Вам хорошего отдыха!</div>
        </div>
    );
};

export default StartForm;
