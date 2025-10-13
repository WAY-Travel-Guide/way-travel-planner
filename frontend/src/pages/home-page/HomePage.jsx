/**
 * @fileoverview
 * Компонент главной страницы приложения.
 * Содержит основной виджет домашней страницы, оборачивает его в стилизованный контейнер.
 *
 * @description
 * HomePage — React-компонент для отображения главной (домашней) страницы.
 * Использует HomeWidget для рендера основного содержимого, пробрасывает в него текущего пользователя и функцию выхода.
 * Подключает стили HomePage.css.
 * Отображает модальное окно подтверждения почты при необходимости.
 *
 * @module HomePage
 */

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HomeWidget } from '../../widgets/';
import { EmailConfirmationModal } from './Modals/EmailConfirmationModal' // Импортируем модальное окно
import "./HomePage.css";

/**
 * @typedef {Object} HomePageProps
 * @property {Object|null} user         - Данные текущего пользователя или null.
 * @property {Function} onLogout        - Функция выхода пользователя (очищает данные и перенаправляет).
 */

/**
 * Главная страница приложения. Отображает основной виджет и передаёт ему user/onLogout.
 *
 * @param {HomePageProps} props         - Свойства компонента (user, onLogout).
 * @returns {JSX.Element}               - Стилизиованный контейнер с содержимым домашней страницы.
 */
const HomePage = function ({ user, onLogout }) {
  const navigate = useNavigate();
  
  // Состояние для управления видимостью модального окна подтверждения почты
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  // Функция для закрытия модального окна
  const handleCloseEmailConfirmation = () => {
    setShowEmailConfirmation(false);
  };

  // --- ВАЖНО: Как мы будем передавать флаг showEmailConfirmation на HomePage? ---
  // Сейчас есть два основных способа, в зависимости от вашей структуры приложения:
  //
  // Способ 1: Через URL-параметры (рекомендуется, если это разовое уведомление)
  //   - RegisterPage будет добавлять параметр в URL, например: /?confirmEmail=true
  //   - HomePage будет считывать этот параметр при монтировании и устанавливать showEmailConfirmation.
  //
  // Способ 2: Через состояние в контексте (если у вас есть Context API)
  //   - Создать Context для уведомлений.
  //   - RegisterPage будет обновлять контекст.
  //   - HomePage будет слушать контекст.
  //
  // Способ 3: Через prop drilling (если RegisterPage является прямым родителем HomePage, что маловероятно)
  //   - Передать функцию-сеттер в RegisterPage.
  //
  // Предположим, мы используем Способ 1 (URL-параметры) как наиболее простой для данной задачи.
  // Вам нужно будет изменить RegisterPage, чтобы он добавлял этот параметр.
  //
  // А здесь, в HomePage, мы будем его считывать.
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const confirmEmailParam = urlParams.get('confirmEmail');
    
    if (confirmEmailParam === 'true') {
      setShowEmailConfirmation(true);
      // Опционально: удалить параметр из URL, чтобы окно не появлялось повторно при обновлении страницы
      // window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Запускается один раз при монтировании компонента

  return (
    /**
     * Основной контейнер главной страницы. Содержит HomeWidget.
     * @see HomeWidget
     */
    <div className="homepage">
      <HomeWidget user={user} onLogout={onLogout}/>

      {/* Отображаем модальное окно, если showEmailConfirmation истинно */}
      <EmailConfirmationModal
        isOpen={showEmailConfirmation}
        onClose={handleCloseEmailConfirmation}
      />
    </div>
  );
}

export { HomePage };