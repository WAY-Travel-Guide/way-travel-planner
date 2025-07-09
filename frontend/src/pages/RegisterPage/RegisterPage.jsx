import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../widgets/RegisterForm/RegisterForm.jsx";
import PictureSwapper from "../../widgets/PictureSwap/PictureSwapper.jsx";
import "./RegisterPage.css";

function RegisterPage({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMsg("");
    if (!login || !password || !confirmPassword) {
      setMsg("Все поля обязательны");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Пароли не совпадают");
      return;
    }
    if (password.length < 4) {
      setMsg("Пароль должен содержать минимум 4 символа");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        // Временно возьмём login из формы, id неизвестен
        const userData = {
          id: data.id, // id у тебя нет, можно сохранить token
          login: login,
          name: login,
          token: data.token, // сохрани JWT, если он нужен
        };
        onLogin(userData);
        navigate(`/user/${data.id}`); // если нужен /user/:id — надо получать id пользователя 
      } else {
        setMsg(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      setMsg("Ошибка сервера");
    }
  };

  return (
      <div className="register-page">
      <div className="reg-form-section">
        <RegisterForm
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          msg={msg}
          handleRegister={handleRegister}
        />
      </div>
      <div className="reg-picture-swapper-section">
        <PictureSwapper />
      </div>
    </div>
  )
}

export default RegisterPage;