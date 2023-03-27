import React, { useState } from "react";
import style from "./hamburgerMenu.module.css";

const HamburgerMenu = () => {
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
        <a className={style.a} href="/">
          Home
        </a>
        <a className={style.a} href="/contact">
          Contact
        </a>
        <a className={style.a} href="/about">
          About
        </a>
        <a className={style.a} href="/signUp">
          Sign Up
        </a>{" "}
        <a className={style.a} href="/signIn">
          Sign In
        </a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
