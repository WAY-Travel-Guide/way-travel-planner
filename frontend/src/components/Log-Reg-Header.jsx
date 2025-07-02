import { useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  console.log("Header received user:", user); // Отладка

  if (user) {
    return (
      <div style={{ position: "absolute", top: "10px", right: "10px", color: "white" }}>
        <span>{user.login || "Unknown"}</span>
        <button onClick={onLogout} style={{ padding: "5px 10px", marginLeft: "10px" }}>
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", top: "10px", right: "10px", color: "white" }}>
      <button onClick={() => navigate("/login")} style={{ padding: "5px 10px", marginRight: "10px" }}>
        Войти
      </button>
      <button onClick={() => navigate("/register")} style={{ padding: "5px 10px" }}>
        Зарегистрироваться
      </button>
    </div>
  );
}

export default Header;