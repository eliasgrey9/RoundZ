import React, { useState } from "react";
import style from "./hamburgerMenu.module.css";

const HamburgerMenu = ({userId}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.hamburgerMenu}>
      <div className={style.hamburgerMenuIcon} onClick={handleMenuClick}>
        <div className={`${style.line} ${isOpen ? style.open : ""}`}></div>
        <div className={`${style.line} ${isOpen ? style.open : ""}`}></div>
        <div className={`${style.line} ${isOpen ? style.open : ""}`}></div>
      </div>
      <div
        className={`${style.hamburgerMenuLinks} ${isOpen ? style.open : ""}`}
      >
        <a className={style.a} href={`/dashboard/${userId}`}>
          Dashboard
        </a>

        <a className={style.a} href="/help">
          Help
        </a>
        <a className={style.a} href="/account">
          Account
        </a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
