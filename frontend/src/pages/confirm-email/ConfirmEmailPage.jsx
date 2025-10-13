/**
 * @fileoverview
 * Компонент страницы подтверждения email.
 * Отображает индикатор загрузки, сообщение об успехе или ошибке.
 * Отправляет запрос на подтверждение email на бэкенд и выполняет редирект.
 *
 * @module ConfirmEmailPage
 */

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ConfirmEmailPage.css";

/**
 * @function ConfirmEmailPage
 * @description Страница подтверждения email.
 *
 * @returns {JSX.Element}
 */
const ConfirmEmailPage = () => {
  /** @type {[URLSearchParams, Function]} */
  const [searchParams] = useSearchParams();
  /** @type {string|null} */
  const token = searchParams.get('token');

  /** @type {[boolean, Function]} */
  const [loading, setLoading] = useState(true);
  /** @type {[boolean, Function]} */
  const [success, setSuccess] = useState(false);
  /** @type {[string|null, Function]} */
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * @async
     * @function confirmEmail
     * @description Отправляет запрос на подтверждение email на бэкенд.
     * @returns {Promise<void>}
     */
    const confirmEmail = async () => {
      try {
        const response = await fetch(`/api/users/confirm-email?token=${token}`, {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ошибка при подтверждении email');
        }

        setSuccess(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      confirmEmail();
    } else {
      setError('Токен подтверждения не найден в URL.');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    /**
     * Основной контейнер страницы подтверждения email.
     * Отображает индикатор загрузки, сообщение об успехе или ошибке.
     */
    <div className="confirm-email-page">
      {loading && <p>Подтверждение...</p>}
      {success && <p>Email успешно подтвержден! Вы будете перенаправлены на страницу входа...</p>}
      {error && <p className="error">Ошибка: {error}</p>}
    </div>
  );
};

export { ConfirmEmailPage };