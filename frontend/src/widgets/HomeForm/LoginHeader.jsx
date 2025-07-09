import { useNavigate } from "react-router-dom";
import Button from "../../shared/ui/OrangeButton/OrangeButton.jsx";

const LoginHeader = function() {
    const navigate = useNavigate();
    return (
        <div style={{
            display: "flex",
            flexDirection: "row", // если кнопки вертикально
            alignItems: "center",
            gap: "70px" // расстояние между кнопками
        }}>
            <Button onClick={() => navigate("/login")} >
                Вход
            </Button>
            <Button onClick={() => navigate("/register")} >
                Регистрация
            </Button>
        </div>
    );
}

export default LoginHeader;