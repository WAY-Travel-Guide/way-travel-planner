import React from 'react';
//import { Link } from 'react-router-dom'; // если используешь роутер, иначе просто a href

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-4 mt-auto rounded-4">
      <div className="container">

        <div className="row row-cols-1 row-cols-md-3 g-4 g-md-5  justify-content-center">

            <div className="col d-flex justify-content-center">

                {/*Первый столбец"*/}
                <div className="text-center text-md-start" >
                    
                    <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
                    <span className="fs-8">(→)</span>
                    <h5 className="mb-0 fw-light fs-6">Остались вопросы?</h5>
                    </div>

                    <p className="mb-4">
                    <a
                        href="mailto:emailmail@gmail.com"
                        className="text-white text-decoration-none fs-4 fs-md-2 text-break"
                    >
                        emailmail@gmail.com
                    </a>
                    </p>

                    <p className="mb-0">
                    <a
                        className="text-secondary text-decoration-none small hover-white"
                    >
                        Политика конфиденциальности
                    </a>
                    </p>

                </div>
            </div>

          {/* Второй столбец */}
          <div className="col  d-flex justify-content-center">
                <div className="text-center text-md-start" >
                    <h5 className="mb-3 fw-light fs-3 ">Контакты</h5>

                    <p className="mb-0 small text-secondary">
                    <a
                        href="tel:+79999999999"
                        className="text-white text-decoration-none"
                    >
                        +7 (999) 999 99 99
                    </a>
                    </p>

                    <p className="mb-0 small text-secondary">
                    Россия, г.Волгоград, пр.Ленина 28а
                    </p>

                    <p className="mb-0">
                    <a
                        to="/about"
                        className="text-secondary text-decoration-none small hover-white"
                    >
                        О нас
                    </a>
                    </p>
                </div>
          </div>

          {/*Третий столбец*/}
            <div className="col d-flex justify-content-center">
                <div className="text-center text-md-end" >
                    <div className=" d-flex align-items-center justify-content-center justify-content-md-end gap-4 mb-3 ">
                        <h5 className="mb-0 fw-light fs-6">Мы открыты</h5>
                        <span className="fs-6">(→)</span>
                    </div>

                    <p className="mb-3 fs-3">
                        8:30 - 18:30
                    </p>

                    <p className="mb-0 small">
                        <span className="text-secondary">Copyright © GrapeLab 2025</span>
                    </p>
                </div>
            </div>
        </div>

      </div>
    </footer>
  );
};

export { Footer };