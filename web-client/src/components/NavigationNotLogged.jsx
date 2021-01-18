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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "120px",
      paddingTop: "24px",
      paddingBottom: "12px",
      paddingLeft: "140px",
      paddingRight: "140px",
      boxShadow: "0px 2px 10px #00000029",
    },
    logo: {
      width: "210px",
    },
    boxTop: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "24px",
    },
    boxBottom: {
      display: "flex",
      justifyContent: "flex-end",
    },
    elements: {
      fontSize: "14px",
    },
    btnLogin: {
      marginLeft: "32px",
      textTransform: "none",
    },
    btnSignup: {
      marginLeft: "32px",
      textTransform: "none",
    },
    link: {
      color: "black",
      textDecoration: "none",
      marginLeft: "64px",
    },
    activeLink: {
      color: "#6069A9",
    },
    linkButton: {
      textDecoration: "none",
    },
  })();

  return (
    <div className={style.main}>
      {/* Logo */}
      <Box>
        <NavLink exact to="/">
          <img className={style.logo} src={Logo} alt="Logo" />
        </NavLink>
      </Box>
      <div className={style.navigation}>
        {/* Login and Signup */}
        <div className={style.boxTop}>
          <p className={style.elements}>
            Reviewer? <a href={LINKS.REVIEWER_LOGIN}>Sign in</a> or
            <a href={LINKS.REVIEWER_SIGN_UP}> Sign up</a>
          </p>
          <NavLink exact to={LINKS.PARTICIPANT_SIGN_UP} className={style.linkButton}>
            <Button
              className={style.btnSignup}
              color="primary"
              type="submit"
              variant="outlined"
            >
              Sign up
            </Button>
          </NavLink>
          <NavLink exact to={LINKS.PARTICIPANT_LOGIN} className={style.linkButton}>
            <Button
              className={style.btnLogin}
              color="primary"
              type="submit"
              variant="contained"
            >
              Log in
            </Button>
          </NavLink>
        </div>

        {/* Categories */}
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
              to={LINKS.WORKS}
              className={style.link}
              activeClassName={style.activeLink}
            >
              Scientific works
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
    </div>
  );
}
