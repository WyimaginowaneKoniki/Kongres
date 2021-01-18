import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Logo from "../images/logo.png";
import Button from "@material-ui/core/Button";
import { LINKS } from "../Constants";

export default function NavigationNotLogged() {
  const style = makeStyles({
    main: {
      width: "100vw",
      height: "123px",
    },
    logo: {
      float: "left",
      marginLeft: "138px",
      marginTop: "10px",
      width: "210px",
    },
    boxBottom: {
      width: "56vw",
      marginRight: "138px",
      paddingBottom: "12px",
      float: "right",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      fontWeight: 700,
    },
    boxTop: {
      width: "56vw",
      marginRight: "138px",
      float: "right",
      height: "88px",
    },
    elements: {
      float: "right",
      marginTop: "34px",
      marginRight: "40px",
      fontSize: "14px",
    },
    btn1: {
      float: "right",
      marginTop: "25px",
      marginLeft: "32px",
      width: "90px",
      height: '35px',
      textTransform: "none",
      backgroundColor: '#6069A9',
      '&:hover':
      {
        backgroundColor: '#6069A9C4',
      }
    },
    btn2: {
      float: "right",
      marginTop: "25px",
      width: "90px",
      height: '35px',
      textTransform: "none",
      color: '#54457F',
      borderColor: '#54457F4D',
      '&:hover':
      {
        borderColor: '#54457F99',
      }
    },
    link: {
      color: "black",
      textDecoration: "none",
      marginLeft: "64px",
    },
    activeLink: {
      color: "#6069A9",
    },
  })();

  return (
    <div className={style.main}>
      <Box>
        <NavLink exact to="/">
          <img className={style.logo} src={Logo} alt="Logo" />
        </NavLink>
      </Box>
      <div className={style.boxTop}>
        <NavLink exact to={LINKS.PARTICIPANT_LOGIN}>
          <Button
            className={style.btn1}
            color="primary"
            type="submit"
            variant="contained"
          >
            Sign in
          </Button>
        </NavLink>
        <NavLink exact to={LINKS.PARTICIPANT_SIGN_UP}>
          <Button
            className={style.btn2}
            color="primary"
            type="submit"
            variant="outlined"
          >
            Sign up
          </Button>
        </NavLink>
        <span className={style.elements}>
          Reviewer? <a href={LINKS.REVIEWER_LOGIN}>Sign in</a> or {" "}
          <a href={LINKS.REVIEWER_SIGN_UP}>Sign up</a>
        </span>
      </div>
      <Box className={style.boxBottom}>
        <Box>
          <NavLink
            exact
            to="/"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Home
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to={LINKS.AGENDA}
            className={style.link}
            activeClassName={style.activeLink}
          >
            Agenda
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to={LINKS.SPEAKERS}
            className={style.link}
            activeClassName={style.activeLink}
          >
            Keynote Speakers
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to={LINKS.ABOUT}
            className={style.link}
            activeClassName={style.activeLink}
          >
            About
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to={LINKS.CONTACT}
            className={style.link}
            activeClassName={style.activeLink}
          >
            Contact
          </NavLink>
        </Box>
      </Box>
    </div>
  );
}

