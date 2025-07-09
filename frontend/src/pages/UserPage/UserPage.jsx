/**
 * @fileoverview
 * Компонент страницы пользователя.
 * Показывает меню пользователя, его формы, а также виджет смены картинки.
 * Реализует выпадающее меню пользователя по наведению/клику.
 *
 * @description
 * UserPage — React-компонент для страницы профиля пользователя.
 * Использует useParams для получения ID пользователя из URL, отображает пользовательское меню, форму и картинку.
 * Меню открывается по наведению или клику по иконке пользователя.
 *
 * @module UserPage
 */

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StartForm from "../../widgets/UserForms/StartForm.jsx";
import PictureSwapper from "../../widgets/PictureSwap/PictureSwapper.jsx";
import UserOptions from "../../widgets/UserForms/UserOptions.jsx";
import "./UserPage.css";

import UserButton from "../../assets/user-button.svg";

/**
 * @typedef {Object} UserPageProps
 * @property {Object|null} user - Данные текущего пользователя (или null).
 */

/**
 * Страница пользователя.
 * Показывает аватар с выпадающим меню, форму пользователя и секцию для смены картинки.
 *
 * @param {UserPageProps} props   - Свойства компонента (user).
 * @returns {JSX.Element}         - Верстка страницы пользователя с меню и формами.
 */
function UserPage({ user }) {
  const navigate = useNavigate();
  const { id } = useParams();

  /** @type {[boolean, Function]} */
  const [menuOpen, setMenuOpen] = useState(false);
  /** @type {[boolean, Function]} */
  const [hovering, setHovering] = useState(false);

  /**
   * Обработчик наведения мыши на область меню пользователя.
   * Открывает меню.
   */
  const handleMouseEnter = () => setMenuOpen(true);

  /**
   * Обработчик ухода мыши с области меню пользователя.
   * Закрывает меню.
   */
  const handleMouseLeave = () => setMenuOpen(false);

  /**
   * Обработчик клика по иконке пользователя.
   * Переключает состояние меню.
   */
  const handleClick = () => setMenuOpen((prev) => !prev);

  /**
   * Флаг, определяющий, нужно ли показывать меню пользователя.
   * Меню отображается, если меню открыто или курсор находится над меню.
   * @type {boolean}
   */
  const shouldShowMenu = menuOpen || hovering;

  /**
   * useEffect — защита от неавторизованного доступа.
   * Если пользователь не авторизован (user == null),
   * происходит автоматический редирект на страницу логина ("/login").
   * Срабатывает при изменении user или navigate.
   */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    /**
     * Основной контейнер страницы пользователя.
     * - user-menu-wrapper: кнопка пользователя и выпадающее меню.
     * - user-form-section: основная форма пользователя.
     * - user-picture-swapper-section: виджет для смены картинки.
     */
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
