import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Logo from "../images/empty-image.png";
import Button from "@material-ui/core/Button";

function Navigation(props) {
  const styles = makeStyles({
    main: {
      width: "90%",
      height: "50px",
      display: "block",
      margin: "auto",
      padding: "2%",
    },
    logo: {
      height: "50px",
      width: "50px",
      float: "left",
    },
    box: {
      width: "80%",
      float: "right",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-end",
      height: "100%",
    },
    link: {
      color: "black",
      textDecoration: "none",
    },
    activeLink: {
      color: "blue",
    },
  });

  const style = styles();

  return (
    <div className={style.main}>
      <Box>
      <NavLink exact to="/"><img className={style.logo} src={Logo} alt="Logo" /> </NavLink>
        </Box>
      <Box className={style.box}>
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

        <Box>
          <Button
            className={style.addButton}
            color="primary"
            type="submit"
            variant="contained"
          >
            Add your work
          </Button>
        </Box>
        <Box>
            <img className={style.logo} src={Logo} alt="Avatar" /> 
        </Box>
        <Box>
            <span>John Smith</span>
        </Box>
      </Box>
    </div>
  );
}

export default Navigation;
