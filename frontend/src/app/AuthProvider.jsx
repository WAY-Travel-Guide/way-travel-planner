/**
 * @fileoverview
 * Компонент для управления состоянием авторизации внутри Router контекста.
 * Содержит логику восстановления состояния страницы и защиты от перехода по ID пользователя.
 */

import { useAuthState, usePagePersistence, useUserProtection } from "../shared/hooks/usePagePersistence";
import PageRouter from "./routes/PageRouter";

/**
 * Компонент-провайдер авторизации, который должен находиться внутри Router контекста.
 * Управляет состоянием пользователя, восстановлением страницы и защитой от несанкционированного доступа.
 */
const AuthProvider = function() {
  console.log("AuthProvider component rendering...");
  
  // Используем новый хук для управления состоянием авторизации
  const { user, login, logout } = useAuthState();

  /**
   * Обработчик успешного входа пользователя.
   *
   * @param {Object} userData - Данные пользователя, полученные после авторизации.
   */
  const handleLogin = (userData) => {
    console.log("handleLogin called with:", userData); // Отладка
    login(userData);
  };

  /**
   * Обработчик выхода пользователя из системы.
   * Очищает состояние и localStorage.
   */
  const handleLogout = () => {
    console.log("handleLogout called"); // Отладка
    logout();
  };

  return (
    <PageRouter user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
  );
};

export default AuthProvider;
