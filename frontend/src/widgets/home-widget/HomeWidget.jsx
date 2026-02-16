import React from "react";
import HomeLogo from "./logo-homepage.svg?react";
import { LoginHeader } from "../../features/loginHeader/LoginHeader"; 

const HomeWidget = () => {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <HomeLogo
        aria-label="Логотип"
        style={{
          width: "min(900px, 78vw)",
          maxHeight: "40vh",
          height: "auto",
          display: "block",
          marginBottom: "1rem",
        }}
      />

      <LoginHeader />
    </div>
  );
};

export { HomeWidget };
