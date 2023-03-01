import React from "react";
import style from "../Footer/footer.module.css";
import linkedInIcon from "../../assets/linkedInIcon.svg";
import emailIcon from "../../assets/emailIcon.svg";
import {AiOutlineCopyright}from "react-icons/ai";


const Footer = () => {
  return (
    <div className={style.body}>
      <div className={style.footerContainer}>
        <div className={style.logo}>RoundZ</div>
        <div className={style.navLinks}>
          <div className={style.navLink}>
            <a>Home</a>
          </div>
          <div className={style.navLink}>
            <a>About</a>
          </div>
          <div className={style.navLink}>
            <a>Contact</a>
          </div>
          <div className={style.navLink}>
            <a>Help</a>
          </div>
        </div>
        <div className={style.socialLinks}>
          <div className={style.socialLink}>
            <img src={emailIcon}></img>
          </div>
          <div className={style.socialLink}>
            <img src={linkedInIcon}></img>
          </div>
        </div>
      </div>
      <div className={style.allRightsReserved}>
        <AiOutlineCopyright />2023 RoundZ. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
