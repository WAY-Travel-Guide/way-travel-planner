import Logo from "../../../public/way-minilogo-2.svg";
import { DefaultButton } from "../../shared/index.js";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="container"  style={{flexWrap: 'nowrap'}}>

        {/* Логотип слева */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={Logo} alt="Лого" className="minilogo" style={{ width: '48px', height: '48px' }}/>
        </a>
        <div className="d-flex align-items-center order-2" style={{ gap: '4vw' }}>
          {/* Создать маршрут */}
          <DefaultButton children="Создать маршрут" onClick={() => window.location.href = '/map'} style={{  bgColor: '#000000', textColor: '#ffffff', width: '227px', height: '48px', borderColor: '#000000'}}/>

          {/* Кнопка-гамбургер для мобильных устройств */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
      </div>

        {/* Адаптивное навигационное меню */}
        <div className="offcanvas offcanvas-start order-1" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          {/* Контент, который сворачивается */}
          <div className="offcanvas-body">
            {/* Ссылки */}
            <ul className="navbar-nav">
              <li className="nav-item px-4">
                <a className="nav-link color-" href="#contacts">Контакты</a>
              </li>
              <li className="nav-item px-4">
                <a className="nav-link" href="#reviews">Отзывы</a>
              </li>
              <li className="nav-item px-4">
                <a className="nav-link" href="#help">Помощь</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};

export { Header };
