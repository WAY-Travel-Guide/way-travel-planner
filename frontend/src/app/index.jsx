import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css'

import App from './App.jsx'
import 'ol/ol.css';

/**
 * Точка монтирования приложения в DOM.
 */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)
