import React from "react";
import style from "../Footer/footer.module.css";

const Footer = () => {
  return (
    <div className={style.body}>
      <div className={style.logo}>RoundZ</div>

      <div className={style.navLinks}>
        <div className={style.navLink}>
          <a>Demo</a>
        </div>
        <div className={style.navLink}>About</div>
        <div className={style.navLink}>Contact</div>
      </div>
    </div>
  );
};

export default Footer;
