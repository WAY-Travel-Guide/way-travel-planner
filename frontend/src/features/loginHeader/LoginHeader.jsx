import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../shared/";

const LoginHeader = function () {
  const navigate = useNavigate();

  

  
  const labelStyle = {
    fontSize: "clamp(14px, 1.6vw, 20px)",
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 gap-md-4">
      <div style={{width: "clamp(140px, 30vw, 345px)"}}>
        <DefaultButton
          onClick={() => navigate("/login")}
          style={{
            bgColor: "#B95700",
            borderColor: "#B95700",
            textColor: "#ffffff",
            width: "100%",
            height: "60px",
          }}
        >
          <span style={labelStyle}>Вход</span>
        </DefaultButton>
      </div>

      <div style={{width: "clamp(140px, 30vw, 345px)"}}>
        <DefaultButton
          onClick={() => navigate("/register")}
          style={{
            bgColor: "#B95700",
            borderColor: "#B95700",
            textColor: "#ffffff",
            width: "100%",
            height: "60px",
          }}
        >
          <span style={labelStyle}>Регистрация</span>
        </DefaultButton>
      </div>
    </div>
  );
};

export { LoginHeader };
