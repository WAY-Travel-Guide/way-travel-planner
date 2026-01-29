import { useAuthState } from "../shared/hooks/usePagePersistence";
import { PageRouter } from "./routes/PageRouter.jsx";

/**
 * Компонент-провайдер авторизации, который должен находиться внутри Router контекста.
 * Управляет состоянием пользователя, восстановлением страницы и защитой от несанкционированного доступа.
 */
const AuthProvider = function() {
  console.log("AuthProvider component rendering...");
  
  // Используем новый хук для управления состоянием авторизации
  const { user, login, logout } = useAuthState();

  // Обработчик успешного входа пользователя.
  const handleLogin = (userData) => {
    console.log("handleLogin called with:", userData);
    login(userData);
  };

  //Обработчик выхода пользователя из системы.
  const handleLogout = () => {
    console.log("handleLogout called");
    logout();
  };

  return (
    <PageRouter user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
  );
};

export { AuthProvider };
