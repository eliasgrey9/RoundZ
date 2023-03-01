import React from "react";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.body}>
      <div className={style.logo}>RoundZ</div>

      <div className={style.navLinks}>
        <div className={style.navLink}>
          <a>Demo</a>
        </div>
        <div className={style.navLink}>Contact</div>
        <div className={style.navLink}>About</div>
      </div>

      <div className={style.signUpIn}>
        <div className={style.signUpLink}>Sign up</div>
        <div className={style.signInBtn}>Sign in</div>
      </div>
    </div>
  );
};

export default Navbar;
