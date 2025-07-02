import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginButton({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); // Хук для навигации

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      console.log("Ответ сервера:", data);

      if (data.success) {
        const userData = {
          id: data.user.id, // ID пользователя с сервера
          login: data.user.login, // Логин пользователя
          name: data.user.name || login, // Имя, если есть, или login
        };
        console.log("Submitting userData:", userData); // Отладка
        onLogin(userData); // Передаем данные пользователя в App.jsx
        navigate(`/user/${userData.id}`); // Перенаправление на /user/:userId
      } else {
        // Если авторизация не удалась, показываем сообщение об ошибке
        setMsg(data.message || 'Ошибка авторизации');
      }
    } catch (error) {
      setMsg('Ошибка сервера. Попробуйте позже.');
      console.error('Ошибка:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
      <input
        type="text"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="Логин"
        style={{ padding: '8px', width: '200px' }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Пароль"
        style={{ padding: '8px', width: '200px' }}
      />
      <button onClick={handleLogin} style={{ padding: '8px 16px' }}>
        Войти
      </button>
      {msg && <div style={{ color: 'red' }}>{msg}</div>}
    </div>
  );
}

function LoginPage({ onLogin }) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '8px',
        color: 'white',
      }}
    >
      <h2>Авторизация</h2>
      <LoginButton onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;