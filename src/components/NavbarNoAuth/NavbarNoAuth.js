import React from "react";
import "./navbarNoAuth.css";
import roundzLogo from "../../assets/roundzLogo.png";
import { Navigate, NavLink } from "react-router-dom";

const NavbarNoAuth = () => {
  return (
    <>
      <div id="home" className="navSection1">
        <div className="navLinks">
          <div>
            <a className="navLink" href="#about">
              About
            </a>
          </div>
          <div>
            <a className="navLink" href="#contact">
              Contact
            </a>
          </div>
          <div>
            <NavLink to="/signIn" className="navLink">
              Sign In
            </NavLink>
          </div>
          
        </div>
      </div>
      <div className="navSection2">
        <div className="logo">
          <img alt="roundz logo" src={roundzLogo} className="logo"></img>
        </div>

        <div>
          <NavLink to="/signUp" className="navLink">
            <button className="sign-up-btn">Sign Up Free</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavbarNoAuth;
