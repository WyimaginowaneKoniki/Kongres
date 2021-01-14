import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Logo from "../images/logo.png";
import Avatar from "../images/default-avatar.png";
import Button from "@material-ui/core/Button";

function Navigation(props) {
  const styles = makeStyles({
    main: {
      width: "100vw",
      height: "123px",
    },
    logo: {
      float: "left",
      marginLeft: "138px",
      marginTop: "10.5px",
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
      borderRadius: "20px",
      marginTop: "16px",
      marginLeft: "16px",
    },
    btn1: {
      float: "right",
      marginTop: '27px',
      textTransform: "none",
      width: '100px',
      height: '35px',
      backgroundColor: '#6069A9',
      '&:hover':
      {
        backgroundColor: '#6069A9C4',
      }
    },
    btn2: {
      float: "right",
      marginTop: '27px',
      textTransform: "none",
      width: '110px',
      height: '35px',
      backgroundColor: '#6069A9',
      '&:hover':
      {
        backgroundColor: '#6069A9C4',
      }
    },
    btn3: {
      float: "right",
      marginTop: '27px',
      textTransform: "none",
      width: '125px',
      height: '35px',
      backgroundColor: '#6069A9',
      '&:hover':
      {
        backgroundColor: '#6069A9C4',
      }
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
      color: '#6069A9',
    },
    logout: {
      float: "right",
      fontSize: "12px",
      color: '#767676',
    },
    link: {
      color: "black",
      textDecoration: "none",
      marginLeft: "64px",
    },
    activeLink: {
      color: "blue",
    },
  });

  const style = styles();
  const user = "Participant";
  const list = 1;

  return (
    <div className={style.main}>
      <Box>
        <NavLink exact to="/">
          <img className={style.logo} src={Logo} alt="Logo" />{" "}
        </NavLink>
      </Box>
      <div className={style.boxTop}>
        <NavLink exact to="/my-profile">
          <img className={style.avatar} src={Avatar} alt="Avatar" />
        </NavLink>
        <div className={style.text}>
        <NavLink exact to="/my-profile">
          <span className={style.name}>Stevie Barrett</span>
        </NavLink>
        <NavLink exact to="/">
          <span className={style.logout}>Log out</span>
        </NavLink>
        </div>
        {user === "Participant" && list === 1 ? (
          <Box>
            <NavLink exact to="/work-view">
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
        ) : null}

        {user === "Participant" && list === 0 ? (
          <Box>
            <NavLink exact to="/adding-work">
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
        ) : null}

        {user === "Reviewer" ? (
          <Box>
            <NavLink exact to="/my-reviews">
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
        ) : null}
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
            to="/agenda"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Agenda
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/speakers"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Keynote Speakers
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/scientific-works"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Scientific works
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/about"
            className={style.link}
            activeClassName={style.activeLink}
          >
            About
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/contact"
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

export default Navigation;
