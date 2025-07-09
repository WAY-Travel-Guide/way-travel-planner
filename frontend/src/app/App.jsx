import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import PageRouter from "./routes/PageRouter";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    // Проверяем, что строка реально валидная!
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
        console.log("Loaded user from localStorage:", JSON.parse(savedUser));
      } catch (e) {
        console.warn("Некорректный user в localStorage:", savedUser);
        setUser(null);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    console.log("handleLogin called with:", userData); // Отладка
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    console.log("handleLogout called"); // Отладка
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <PageRouter user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
  );
}

export default App;