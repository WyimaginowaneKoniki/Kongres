import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core/";
import Logo from "../images/logo.png";
import Avatar from "../images/default-avatar.png";
import { URL, LINKS } from "../Constants";

export default function Navigation(props) {
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
    avatar: {
      float: "right",
      width: "56px",
      height: "56px",
      borderRadius: "50px",
      marginTop: "16px",
      marginLeft: "16px",
    },
    btn1: {
      float: "right",
      marginTop: "27px",
      textTransform: "none",
      width: "100px",
      height: "35px",
      backgroundColor: "#6069A9",
      "&:hover": {
        backgroundColor: "#6069A9C4",
      },
    },
    btn2: {
      float: "right",
      marginTop: "27px",
      textTransform: "none",
      width: "110px",
      height: "35px",
      backgroundColor: "#6069A9",
      "&:hover": {
        backgroundColor: "#6069A9C4",
      },
    },
    btn3: {
      float: "right",
      marginTop: "27px",
      textTransform: "none",
      width: "125px",
      height: "35px",
      backgroundColor: "#6069A9",
      "&:hover": {
        backgroundColor: "#6069A9C4",
      },
    },
    text: {
      float: "right",
      width: "84px",
      textAlign: "right",
      marginTop: "27px",
      marginLeft: "40px",
      color: "#6069A9",
    },
    name: {
      float: "right",
      fontSize: "14px",
      color: "#6069A9",
    },
    logout: {
      float: "right",
      fontSize: "12px",
      color: "#767676",
      "&:hover": {
        cursor: "pointer",
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
      <Box>
        <NavLink exact to="/">
          <img className={style.logo} src={Logo} alt="Logo" />
        </NavLink>
      </Box>
      <div className={style.boxTop}>
        <NavLink exact to={LINKS.PROFILE}>
          <img
            className={style.avatar}
            src={
              props.userInfo.photoBase64 ? props.userInfo.photoBase64 : Avatar
            }
            alt="Avatar"
          />
        </NavLink>
        <div className={style.text}>
          <NavLink exact to={LINKS.PROFILE}>
            <span className={style.name}>{props.userInfo.name}</span>
          </NavLink>
          <span className={style.logout} onClick={Logout}>
            Log out
          </span>
        </div>

        {props.userInfo.role === "Participant" &&
          props.userInfo.scientificWorkId === 0 && (
            <Box>
              <NavLink exact to={LINKS.ADDING_WORK}>
                <Button
                  className={style.btn2}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Add work
                </Button>
              </NavLink>
            </Box>
          )}

        {props.userInfo.role === "Participant" &&
          props.userInfo.scientificWorkId !== 0 && (
            <Box>
              <NavLink exact to={path}>
                <Button
                  className={style.btn1}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  My work
                </Button>
              </NavLink>
            </Box>
          )}

        {props.userInfo.role === "Reviewer" && (
          <Box>
            <NavLink exact to={LINKS.REVIEWS}>
              <Button
                className={style.btn3}
                color="primary"
                type="submit"
                variant="contained"
              >
                My reviews
              </Button>
            </NavLink>
          </Box>
        )}
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
  );
}
