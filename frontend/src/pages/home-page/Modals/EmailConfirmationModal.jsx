/**
 * @fileoverview
 * Компонент модального окна для подтверждения почты.
 *
 * @description
 * EmailConfirmationModal - React-компонент, отображающий всплывающее окно с сообщением
 * о необходимости подтвердить электронную почту. Предоставляет кнопку для закрытия окна.
 *
 * @module EmailConfirmationModal
 */

import React from "react";
import "./EmailConfirmationModal.css"; // Предполагается, что стили будут в этом файле

/**
 * @typedef {Object} EmailConfirmationModalProps
 * @property {boolean} isOpen   - Флаг, определяющий, открыто ли модальное окно.
 * @property {Function} onClose - Функция, вызываемая при закрытии модального окна.
 */

/**
 * Модальное окно для уведомления пользователя о необходимости подтверждения почты.
 *
 * @param {EmailConfirmationModalProps} props - Свойства компонента (isOpen, onClose).
 * @returns {JSX.Element|null} - Компонент модального окна или null, если оно закрыто.
 */
const EmailConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Подтвердите вашу почту</h2>
        <p>
          На ваш адрес электронной почты было отправлено письмо. Пожалуйста,
          перейдите по ссылке в письме, чтобы активировать вашу учетную запись.
        </p>
        <button onClick={onClose} className="modal-close-button">
          Понятно
        </button>
      </div>
    </div>
  );
};

export { EmailConfirmationModal };