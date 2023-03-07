import React from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className={style.body}>
      <div className={style.logo}>RoundZ</div>

      <div className={style.lgScreen}>
        <div className={style.navLinks}>
          <div className={style.navLink}>
            <a>Home</a>
          </div>
          <div className={style.navLink}>
            <a>Contact</a>
          </div>
          <div className={style.navLink}>
            <a>About</a>
          </div>
        </div>

        <div className={style.signUpIn}>
          <div>
            <Link className={style.signUpLink} to={"/signUp"}>
              Sign up
            </Link>
          </div>
          <div>
            <Link className={style.signInBtn} to={"/signIn"}>
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className={style.mdScreen}>
        <i className={style.hamburgerMenu}>
          <GiHamburgerMenu />
        </i>
      </div>

      <div className={style.smScreen}>
        <i className={style.hamburgerMenu}>
          <GiHamburgerMenu />
        </i>
      </div>
    </div>
  );
};

export default Navbar;
