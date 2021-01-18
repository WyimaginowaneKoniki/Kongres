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
      fontWeight: "bold",
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
    btnLogin: {
      marginLeft: "32px",
    },
    btnSignup: {
      marginLeft: "32px",
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
    linkButton: {
      textDecoration: "none",
    },
  })();

  const Logout = () => {
    localStorage.removeItem("jwt");
    window.location.href = URL;
  };

  const userPanel = () => {
    // If user is logged
    if (props.userInfo) {
      const path = `${LINKS.WORKS}/${props.userInfo.scientificWorkId}`;
      return (
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
      );
      // If user is not logged
    } else {
      return (
        <div className={style.boxTop}>
          <p className={style.elements}>
            Reviewer? <a href={LINKS.REVIEWER_LOGIN}>Log in</a> or
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
      );
    }
  };

  return (
    <div className={style.main}>
      {/* Logo */}
      <Box>
        <NavLink exact to="/">
          <img className={style.logo} src={Logo} alt="Scienture conference logo" />
        </NavLink>
      </Box>
      <div className={style.navigation}>
        {userPanel()}
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
          {props.userInfo && (
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
          )}
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
