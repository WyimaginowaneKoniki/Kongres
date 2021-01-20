import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../images/logo.png";
import Email from "../images/icon-mail.png";
import Phone from "../images/icon-phone.png";
import Github from "../images/icon-github.png";
import { NavLink } from "react-router-dom";
import { LINKS } from "../Constants";

export default function Footer() {
  const style = makeStyles({
    left: {
      justifyContent: "flex-start",
      "@media only screen and (max-width: 768px)": {
        justifyContent: "center",
      },
    },
    centrum: {
      marginLeft: "32px",
      minWidth: "120px",
      "@media only screen and (max-width: 768px)": {
        display: "flex",
        flexWrap: "wrap",
      },
    },
    right: {
      marginLeft: "32px",
      minWidth: "270px",
    },
    logo: {
      width: "210px",
    },
    link: {
      textDecoration: "none",
      paddingRight: "8px",
      paddingBottom: "8px",
      color: "black",
      display: "flex",
      "&:hover": {
        color: "#6069A9",
      },
    },
    icon: {
      width: "32px",
      height: "32px",
      marginRight: "16px",
    },
  })();

  return (
    <div className="footer">
      <div className={style.left}>
        <NavLink exact to="/">
          <img
            className={style.logo}
            src={Logo}
            alt="Scienture conference logo"
          />
        </NavLink>
        <div>Scienture conference &copy; 2021</div>
      </div>
      <div className={style.centrum}>
        <div>
          <NavLink exact to={LINKS.PRIVACY} className={style.link}>
            Privacy policy
          </NavLink>
        </div>
        <div>
          <NavLink exact to={LINKS.COOKIES} className={style.link}>
            Cookies policy
          </NavLink>
        </div>
        <div>
          <NavLink exact to={LINKS.REGULATIONS} className={style.link}>
            Regulations
          </NavLink>
        </div>
      </div>
      <div className={style.right}>
        <div>
          <a href="mailto:scientureconf@gmail.com" className={style.link}>
            <img src={Email} alt="Email" className={style.icon} />
            scientureconf@gmail.com
          </a>
        </div>
        <div>
          <a href="tel:987654321" className={style.link}>
            <img src={Phone} alt="Phone" className={style.icon} />
            987 654 321
          </a>
        </div>
        <div>
          <a
            href="https://github.com/WyimaginowaneKoniki/Kongres"
            className={style.link}
          >
            <img src={Github} alt="Github" className={style.icon} />
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
