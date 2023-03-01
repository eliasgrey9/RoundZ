import React from "react";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.body}>
      <div className={style.logo}>RoundZ</div>

      <div className={style.navLinks}>
        <div className={style.navLink}>
          <a>Home</a>
        </div>
        <div className={style.navLink}><a>Contact</a></div>
        <div className={style.navLink}><a>About</a></div>
      </div>

      <div className={style.signUpIn}>
        <div className={style.signUpLink}><a>Sign up</a></div>
        <div className={style.signInBtn}><a>Sign in</a></div>
      </div>
    </div>
  );
};

export default Navbar;
