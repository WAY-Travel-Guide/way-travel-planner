import React from 'react';
import Input from '../../shared/ui/Input/Input.jsx';
import BlueButton from '../../shared/ui/BlueButton/BlueButton.jsx';
import ToHomeLogoButton from "../ReturnToHome/ToHome.jsx";
import './LoginForm.css';

const LoginForm = function ({ login, setLogin, password, setPassword, msg, handleLogin }) {
  return (
    <div className="login-form">
      <ToHomeLogoButton />
      <h1 className='title'>С возвращением!</h1>

      <Input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Логин"
        style={{  }}
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        style={{  }}
      />
      {msg && <div className="error-msg">{msg}</div>}

      <div className="forgot">Забыли пароль?</div>

      <BlueButton onClick={handleLogin} style={{ }}>
        Войти
      </BlueButton>

      <div className="bottom-text">
        Еще не зарегистрированы?
        <a href="/register">Зарегистрируйтесь сейчас!</a>
      </div>
    </div>
  );
};

export default LoginForm;
