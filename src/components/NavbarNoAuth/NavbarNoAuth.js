import React from "react";
import "./navbarNoAuth.css";
import roundzLogo from "../../assets/roundzLogo.png";

const NavbarNoAuth = () => {
  return (
    <>
      <div className="navSection1">
        <div className="navLinks">
          <div>
            <a className="navLink" href="#">
              About
            </a>
          </div>
          <div>
            <a className="navLink" href="#">
              Contact
            </a>
          </div>
          <div>
            <a className="navLink" href="#">
              Sign In
            </a>
          </div>
        </div>
      </div>
      <div className="navSection2">
        <div className="logo">
          <img alt="roundz logo" src={roundzLogo} className="logo"></img>
        </div>

        <div>
          <a className="navLink" href="#">
            <button className="sign-up-btn">Sign Up Free</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default NavbarNoAuth;
