import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import bg from "./assets/bg.jpg";
import LoginPage from "./components/LoginPage";
import UserPage from "./components/UserPage";
import MainPage from "./components/MainPage";
import RegisterPage from "./components/RegisterPage";
import Header from "./components/Log-Reg-Header";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      console.log("Loaded user from localStorage:", JSON.parse(savedUser)); // Отладка
      setUser(JSON.parse(savedUser));
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
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          <Route
            path="/"
            element={user ? <UserPage user={user} /> : <MainPage user={user} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;