/**
 * @fileoverview
 * Точка входа фронтенд-приложения на React.
 * Инициализирует рендеринг главного компонента App внутри контейнера root.
 * Подключает глобальные стили приложения и стили библиотеки OpenLayers.
 *
 * @description
 * Импортируются основные зависимости React, глобальные CSS-стили и стили сторонней библиотеки (OpenLayers).
 * Рендеринг происходит через createRoot и оборачивается в StrictMode для дополнительной проверки кода на ошибки и предупреждения.
 * Главный компонент приложения — App.
 *
 * @module index
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'ol/ol.css';

/**
 * Точка монтирования приложения в DOM.
 * Находит контейнер с id="root" и инициализирует в него React-приложение.
 * @see App
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
