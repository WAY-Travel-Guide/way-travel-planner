import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../widgets/LoginForm/LoginForm.jsx";
import PictureSwapper from "../../widgets/PictureSwap/PictureSwapper.jsx";
import "./LoginPage.css";

const LoginPage = function ({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        const userData = {
          id: data.id,
          login: login,
          name: login,
          token: data.token,
        };
        onLogin(userData);
        navigate(`/user/${data.id}`);
      } else {
        setMsg(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      setMsg('Ошибка сервера. Попробуйте позже.');
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="form-section">
        <LoginForm
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          msg={msg}
          handleLogin={handleLogin}
        />
      </div>
      <div className="pictur-swapper-section">
        <PictureSwapper />
      </div>
    </div>
  );
};

export default LoginPage;
