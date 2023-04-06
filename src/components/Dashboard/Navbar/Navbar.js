import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";

const Navbar = ({userId}) => {
  const DASHBOARD_LINK = "DASHBOARD";
  const HELP_LINK = "HELP";
  const ACCOUNT_LINK = "ACCOUNT";

  const [activeNavLink, setActiveNavLink] = useState(DASHBOARD_LINK);
  const underlineDashboardNavLink = () => setActiveNavLink(DASHBOARD_LINK);
  const underlineHelpNavLink = () => setActiveNavLink(HELP_LINK);
  const underlineAccountNavLink = () => setActiveNavLink(ACCOUNT_LINK);

  const isDashboardLinkClicked = activeNavLink === DASHBOARD_LINK;
  const isHelpLinkClicked = activeNavLink === HELP_LINK;
  const isAccountLinkClicked = activeNavLink === ACCOUNT_LINK;



console.log('NAVBAR USER ID',userId)


  return (
    <div className={style.body}>
      <div className={style.logo}>RoundZ</div>

      <div className={style.navLinks}>
        <div>
          <Link to={`/dashboard/${userId}`}>
            <a
              onClick={underlineDashboardNavLink}
              className={
                isDashboardLinkClicked ? style.highlightActive : style.navLink
              }
            >
              Dashboard
            </a>
          </Link>
        </div>
        <div>
          <a
            onClick={underlineHelpNavLink}
            className={
              isHelpLinkClicked ? style.highlightActive : style.navLink
            }
          >
            Help
          </a>
        </div>
        <div>
          <a
            onClick={underlineAccountNavLink}
            className={
              isAccountLinkClicked ? style.highlightActive : style.navLink
            }
          >
            Account
          </a>
        </div>
      </div>

      <div className={style.hamburgerScreen}>
        <div className={style.hamburgerMenu}>
          <HamburgerMenu userId={userId}/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
