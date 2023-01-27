import React from "react";
import "./navbarAuth.css";
import roundzLogo from "../../assets/roundzLogo.png";
import { NavLink } from "react-router-dom";

const NavbarAuth = () => {
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
            <NavLink to="/dashboard" className="navLink">
              Dashboard
            </NavLink>
          </div>
          <div>
            <a className="navLink" href="#contact">
              Sign out
            </a>
          </div>
        </div>
      </div>
      <div className="navSection2">
        <div className="logo">
          <img alt="roundz logo" src={roundzLogo} className="logo"></img>
        </div>
      </div>
    </>
  );
};

export default NavbarAuth;
