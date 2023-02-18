import React from "react";
import logoPath from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип" />
      <div className="header-nav-block">
        <p className="header-nav-block__text ">email@mail.com</p>
        <p className="header-nav-block__text ">Выйти</p>
      </div>
    </header>
  );
}

export default Header;
