import Exit from "../../assets/exit.svg";
import History from "../../assets/time-past.svg";
import Person from "../../assets/user.svg";
import Logo from "../../../public/way-minilogo-2.svg";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent **fixed-top** shadow">
      <div className="container-fluid">
        {/* Логотип слева */}
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Лого" className="minilogo"/>
        </a>

        {/* Контент, который сворачивается */}
        <div className="offcanvas offcanvas-top h-100" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          {/* Ссылки */}
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            
          </div>

          <div className="offcanvas-body" >
            
            {/* Ссылки внутри offcanvas */}
            <ul className="navbar-nav justify-content-start">
              <li className="nav-item">
                <a className="nav-link" href="#reviews">Отзывы</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#contacts">Контакты</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#help">Помощь</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/map">Карта</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="d-flex align-items-center flex-nowrap" style={{ gap: '40px' }}>
          {/* Иконки */}
          <img src={Exit} alt="Главная" className="header-nav-icon" style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
          <img src={History} alt="О нас" className="header-nav-icon" style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
          <img src={Person} alt="Контакты" className="header-nav-icon" style={{ width: '40px', height: '40px', cursor: 'pointer' }} />

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

        
      </div>
    </nav>
  );
};

export { Header };