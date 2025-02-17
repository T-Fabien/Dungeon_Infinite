import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

function Navbar() {
  const [showMenu, SetShowMenu] = useState(false);

  const handleShowMenu = () => {
    SetShowMenu(!showMenu);
  };

  return (
    <header>
      <div className="navbar__logo">
        <NavLink to="/" end className="title-link">
        <img src={logo} alt="" />
        </NavLink>
        <nav className={`navbar ${showMenu ? "showmenu" : "hidemenu"}`}>
          <ul className="navbar__content">
            <li>
              <NavLink to="/" end className="link" onClick={handleShowMenu}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/personnages"
                className="link"
                onClick={handleShowMenu}
              >
                Personnages
              </NavLink>
            </li>
          </ul>
          <button className="navbar__burger" onClick={handleShowMenu}>
            <span className="navbar-bar"></span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
