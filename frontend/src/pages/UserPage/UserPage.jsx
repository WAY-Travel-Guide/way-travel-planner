import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import StartForm from "../../widgets/UserForms/StartForm.jsx";
import PictureSwapper from "../../widgets/PictureSwap/PictureSwapper.jsx";
import UserOptions from "../../widgets/UserForms/UserOptions.jsx";
import "./UserPage.css";

import UserButton from "../../assets/user-button.svg";

function UserPage({ user }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  const handleMouseEnter = () => setMenuOpen(true);
  const handleMouseLeave = () => setMenuOpen(false);
  const handleClick = () => setMenuOpen((prev) => !prev);

  const shouldShowMenu = menuOpen || hovering;

  return (
    <div className="user-page">
      <div
        className="user-menu-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={UserButton}
          alt="Пользователь"
          className="start-user-corner-button"
        />
        {shouldShowMenu  && <UserOptions userName={user?.name} />}
      </div>

      <div className="user-form-section">
        <StartForm userName={user?.name} />
      </div>
      <div className="user-picture-swapper-section">
        <PictureSwapper />
      </div>
    </div>
  );
}

export default UserPage;