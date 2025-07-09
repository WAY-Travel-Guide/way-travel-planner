import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage.jsx";
import UserPage from "../../pages/UserPage/UserPage.jsx";
import HomePage from "../../pages/HomePage/HomePage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";

const PageRouter = function({ user, handleLogin, handleLogout }) {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
                    <Route path="/" element={<HomePage user={user} onLogout={handleLogout} />} />
                    <Route path="/user/:id" element={<UserPage user={user} />} />
                </Routes>
            </div>
        </BrowserRouter>
        
    )
}

export default PageRouter;