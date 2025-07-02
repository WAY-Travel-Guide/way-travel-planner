import { useNavigate } from "react-router-dom";

function UserPage({ user }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        fontSize: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "20px",
      }}
    >
      <h1>Привет, {user?.name || user?.login || "Пользователь"}!</h1>
      <p>Добро пожаловать в ваш профиль!</p>
      <p>Ваш логин: {user?.login}</p>
      <button
        onClick={() => navigate("/")}
        style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
      >
        На главную
      </button>
    </div>
  );
}

export default UserPage;