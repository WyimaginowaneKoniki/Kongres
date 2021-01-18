import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../images/logo.png";

export default function Footer() {
  const style = makeStyles({
    left: {
      justifyContent: "flex-start",
    },
    logo: {
      width: "210px",
    },

    link: {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "#6069A9",
      },
    },
  })();

  return (
    <div className="footer">
      <div className={style.left}>
        <img className={style.logo} src={Logo} alt="Logo" />
        <div className={style.text}>Scienture conference &copy; 2021</div>
      </div>
      <div className={style.centrum}>
        <div className={style.text}>
          <a href="privacy-policy" className={style.link}>
            Privacy policy
          </a>
        </div>
        <div className={style.text}>
          <a href="cookies-policy" className={style.link}>
            Cookies policy
          </a>
        </div>
        <div className={style.text}>
          <a href="https://github.com/WyimaginowaneKoniki/Kongres" className={style.link}>
            Github
          </a>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.text}>tel:123456789</div>
        <div className={style.text}>ul.Kaszubska 23, Gliwice</div>
        <div className={style.text}>e-mail: scientureconf@gmail.com</div>
      </div>
    </div>
  );
}
