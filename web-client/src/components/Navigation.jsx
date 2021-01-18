import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Logo from "../images/logo.png";
import Avatar from "../images/default-avatar.png";
import Button from "@material-ui/core/Button";
import { URL, LINKS } from "../Constants";

export default function Navigation(props) {
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
      alignItems: "center",
      marginBottom: "24px",
    },
    boxBottom: {
      display: "flex",
      justifyContent: "flex-end",
    },
    elements: {
      fontSize: "14px",
    },
    linkButton: {
      textDecoration: "none",
    },
    avatar: {
      width: "56px",
      height: "56px",
      borderRadius: "50px",
      marginLeft: "16px",
    },
    btn: {
      textDecoration: "none",
      textTransform: "none",
    },
    user: {
      marginLeft: "40px",
    },
    name: {
      fontSize: "14px",
      textAlign: "right",
      textDecoration: "none",
      color: "#6069A9",
      lineHeight: "1em",
      marginBottom: "8px",
    },
    logout: {
      fontSize: "12px",
      textAlign: "right",
      color: "#767676",
      lineHeight: "1em",
      "&:hover": {
        cursor: "pointer",
        color: "#000000",
      },
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

  const Logout = () => {
    localStorage.removeItem("jwt");
    window.location.href = URL;
  };

  const path = `${LINKS.WORKS}/${props.userInfo.scientificWorkId}`;

  return (
    <div className={style.main}>
      {/* Logo */}
      <Box>
        <NavLink exact to="/">
          <img className={style.logo} src={Logo} alt="Logo" />
        </NavLink>
      </Box>
      <div className={style.navigation}>
        <div className={style.boxTop}>
          {/* Button My reviews */}
          {props.userInfo.role === "Reviewer" && (
            <Box>
              <NavLink exact to={LINKS.REVIEWS} className={style.linkButton}>
                <Button
                  className={style.btn}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  My reviews
                </Button>
              </NavLink>
            </Box>
          )}

          {/* Button My work */}
          {props.userInfo.role === "Participant" &&
            props.userInfo.scientificWorkId !== 0 && (
              <Box>
                <NavLink exact to={path} className={style.linkButton}>
                  <Button
                    className={style.btn}
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    My work
                  </Button>
                </NavLink>
              </Box>
            )}

          {/* Button Add work */}
          {props.userInfo.role === "Participant" &&
            props.userInfo.scientificWorkId === 0 && (
              <Box>
                <NavLink exact to={LINKS.ADDING_WORK} className={style.linkButton}>
                  <Button
                    className={style.btn}
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    Add work
                  </Button>
                </NavLink>
              </Box>
            )}

          {/* User */}
          <div className={style.user}>
            <NavLink exact to={LINKS.PROFILE} className={style.linkButton}>
              <div className={style.name}>{props.userInfo.name}</div>
            </NavLink>
            <div className={style.logout} onClick={Logout}>
              Log out
            </div>
          </div>

          <NavLink exact to={LINKS.PROFILE}>
            <img
              className={style.avatar}
              src={props.userInfo.photoBase64 ? props.userInfo.photoBase64 : Avatar}
              alt="Avatar"
            />
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
