import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logoPath from "../images/logo.svg";

function Header() {
  const { handleLogout, currentUser } = useContext(CurrentUserContext)
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип" />
      <div className="header-nav-block">
        <p className="header-nav-block__text">{ currentUser && currentUser.email }</p>
        { currentUser &&
          <p className="header-nav-block__text" onClick={() => handleLogout()}>Выйти</p>
        }
      </div>
    </header>
  );
}

export default Header;
