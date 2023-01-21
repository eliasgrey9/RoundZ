import React from "react";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineLinkedin, AiOutlineCopyright } from "react-icons/ai";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <footer>
      <ul className="permalinks">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

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
          <AiOutlineCopyright /> RoundZ 2023 . All rights reserved
        </small>
      </div>
    </footer>
  );
};

export default Footer;
