import React from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";

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
        <div>
        <Link className={style.signUpLink} to={'/signUp'}>
          Sign up</Link></div>
        <div className={style.signInBtn}><a>Sign in</a></div>
      </div>
    </div>
  );
};

export default Navbar;
