import React from "react";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineLinkedin, AiOutlineCopyright } from "react-icons/ai";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <footer>
      <div className="permalinks">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="footer_socials">
        <a href="https://www.linkedin.com/in/elias-grey" target="_blank">
          <AiOutlineLinkedin />
        </a>
        <a href="#contact">
          <CgMail />
        </a>
      </div>

      <div className="footer_copyright">
        <small>
          &copy; copyright
          <AiOutlineCopyright /> RoundZ 2023. All rights reserved
        </small>
      </div>
    </footer>
  );
};

export default Footer;
