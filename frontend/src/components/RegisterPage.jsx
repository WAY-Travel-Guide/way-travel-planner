import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        setMsg(data.message);
      }
    } catch (error) {
      setMsg("Ошибка сервера");
    }
  };

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "20px", borderRadius: "8px", color: "white" }}>
      <h2>Регистрация</h2>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Логин"
        style={{ padding: "8px", width: "200px", margin: "5px 0" }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        style={{ padding: "8px", width: "200px", margin: "5px 0" }}
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Подтвердите пароль"
        style={{ padding: "8px", width: "200px", margin: "5px 0" }}
      />
      <button onClick={handleRegister} style={{ padding: "8px 16px", marginTop: "10px" }}>
        Зарегистрироваться
      </button>
      {msg && <div style={{ color: "red", marginTop: "10px" }}>{msg}</div>}
    </div>
  );
}

export default RegisterPage;