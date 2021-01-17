import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../images/empty-image.png";

export default function Footer() {
  const style = makeStyles({
    main: {
      width: "96%",
      height: "100px",
      padding: "2%",
      float: "left",
      backgroundColor: "#e9e9e9",
    },
    left: {
      width: "30%",
      float: "left",
    },
    centrum: {
      width: "40%",
      float: "left",
    },
    right: {
      width: "30%",
      float: "left",
    },
    logo: {
      height: "80px",
      width: "80px",
      float: "center",
    },
    policy: {
      width: "100%",
      padding: "2%",
    },
    link: {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "grey",
      },
    },
  })();

  return (
    <div className={style.main}>
      <div className={style.left}>
        <div className={style.policy}>
          <a href="privacy-policy" className={style.link}>
            Polityka prywatności
          </a>
        </div>
        <div className={style.policy}>
          <a href="cookies-policy" className={style.link}>
            Polityka cokkies
          </a>
        </div>
        <div className={style.policy}>
          <a
            href="https://github.com/WyimaginowaneKoniki/Kongres"
            className={style.link}
          >
            Github
          </a>
        </div>
      </div>
      <div className={style.centrum}>
        <img className={style.logo} src={Logo} alt="Logo" />
        <div className={style.policy}>Scienture conference &copy; 2021</div>
      </div>
      <div className={style.right}>
        <div className={style.policy}>tel:123456789</div>
        <div className={style.policy}>ul.Kaszubska 23 Gliwice</div>
        <div className={style.policy}>E-mail: conference@gmail.com</div>
      </div>
    </div>
  );
}
