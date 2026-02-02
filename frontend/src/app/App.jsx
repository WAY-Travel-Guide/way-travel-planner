import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { PageRouter } from "./routes/PageRouter.jsx";

// Основной компонент приложения, отвечающий за маршрутизацию и авторизацию.
function App() {

  // Состояние загрузки страницы
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
    
  //   // Снимаем "loading", когда всё загрузилось
  //   const handleLoad = () => {
  //     setTimeout(() => { setLoading(false); }, 1000);
  //   };

  //   if (document.readyState === "complete") {
  //     // Страница уже загружена
  //     setLoading(false);
  //   } else {
  //     // Ждём событие load
  //     window.addEventListener("load", handleLoad);
  //   }

  //   return () => window.removeEventListener("load", handleLoad);
  // }, []);
  
  return (
    <BrowserRouter>
      <PageRouter />
    </BrowserRouter>
  );
}

export default App;
