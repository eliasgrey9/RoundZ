import React, { useState } from "react";
import style from "./hamburgerMenu.module.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className="hamburger-menu-icon" onClick={handleMenuClick}>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
      </div>
      <div className={`hamburger-menu-links ${isOpen ? "open" : ""}`}>
        <a className={style.a} href="/">
          Home
        </a>
        <a className={style.a} href="/contact">
          Contact
        </a>
        <a className={style.a} href="/about">
          About
        </a>
        <a className={style.a} href="/signup">
          Sign Up
        </a>
        <a className={style.a} href="/signin">
          Sign In
        </a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
