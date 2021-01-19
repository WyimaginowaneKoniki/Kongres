import React from "react";
import "../App.css";
import "../index.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core/";
import Logo from "../images/logo.png";
import Avatar from "../images/default-avatar.png";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpen from "@material-ui/icons/MenuOpen";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { URL, LINKS } from "../Constants";

export default function Navigation(props) {
  const style = makeStyles({
    logo: {
      width: "210px",
    },
    boxTop: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      "@media (max-width: 1200px)": {
        display: "none",
      },
    },
    boxBottom: {
      display: "flex",
      justifyContent: "flex-end",
      fontSize: "16px",
      fontWeight: "bold",
      paddingTop: "8px",
      paddingBottom: "8px",
      "@media (max-width: 1200px)": {
        display: "none",
      },
    },
    elements: {
      fontSize: "14px",
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
    },
    activeLink: {
      color: "#6069A9",
    },
    linkButton: {
      textDecoration: "none",
    },
    icon: {
      width: "60px",
      height: "60px",
    },
    hamburger: {
      color: "#6069A9",
      display: "none",
      "@media (max-width: 1200px)": {
        justifyContent: "flex-end",
        display: "flex",
      },
    },
    paperAnchorTop: {
      marginTop: "120px",
    },
    linkMenu: {
      fontWeight: "700",
      color: "#6069A9",
      textDecoration: "none",
      display: "block",
    },
    nameAdress: {
      margin: "auto",
    },
    logoutAddress: {
      fontSize: "14px",
      margin: "auto",
      color: "#767676",
      lineHeight: "1em",
      "&:hover": {
        cursor: "pointer",
        color: "#000000",
      },
    },
    button: {
      margin: "auto",
    },
  })();

  const Logout = () => {
    localStorage.removeItem("jwt");
    window.location.href = URL;
  };

  const [open, setOpen] = React.useState(false);
  const display = clsx(style.hamburger);
  console.log(display);

  const handleDrawer = () => {
    if (open) setOpen(false);
    else if (!open) setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
                <NavLink
                  exact
                  to={LINKS.ADDING_WORK}
                  className={style.linkButton}
                >
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
              src={
                props.userInfo.photoBase64 ? props.userInfo.photoBase64 : Avatar
              }
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
          <NavLink
            exact
            to={LINKS.PARTICIPANT_SIGN_UP}
            className={style.linkButton}
          >
            <Button
              className={style.btnSignup}
              color="primary"
              type="submit"
              variant="outlined"
            >
              Sign up
            </Button>
          </NavLink>
          <NavLink
            exact
            to={LINKS.PARTICIPANT_LOGIN}
            className={style.linkButton}
          >
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
    <div className="header-menu">
      {/* Logo */}
      <Box>
        <NavLink exact to="/">
          <img
            className={style.logo}
            src={Logo}
            alt="Scienture conference logo"
          />
        </NavLink>
      </Box>
      <Drawer
        open={open}
        anchor="top"
        variant="persistent"
        classes={{ paper: style.paperAnchorTop }}
      >
        <List>
          <NavLink exact to="/" className={style.linkMenu}>
            <ListItem button onClick={handleDrawerClose}>
              <span className={style.nameAdress}>Home</span>
            </ListItem>
          </NavLink>
          <NavLink exact to={LINKS.AGENDA} className={style.linkMenu}>
            <ListItem button onClick={handleDrawerClose}>
              <span className={style.nameAdress}>Agenda</span>
            </ListItem>
          </NavLink>
          <NavLink exact to={LINKS.SPEAKERS} className={style.linkMenu}>
            <ListItem button onClick={handleDrawerClose}>
              <span className={style.nameAdress}>Keynote speakers</span>
            </ListItem>
          </NavLink>
          {props.userInfo && (
            <NavLink exact to={LINKS.WORKS} className={style.linkMenu}>
              <ListItem button onClick={handleDrawerClose}>
                <span className={style.nameAdress}>Scientific works</span>
              </ListItem>
            </NavLink>
          )}
          <NavLink exact to={LINKS.ABOUT} className={style.linkMenu}>
            <ListItem button onClick={handleDrawerClose}>
              <span className={style.nameAdress}>About</span>
            </ListItem>
          </NavLink>
          <NavLink exact to={LINKS.CONTACT} className={style.linkMenu}>
            <ListItem button onClick={handleDrawerClose}>
              <span className={style.nameAdress}>Contact</span>
            </ListItem>
          </NavLink>
          <ListItem>
            <div className={style.button}>
              {!props.userInfo && (
                <NavLink
                  exact
                  to={LINKS.PARTICIPANT_SIGN_UP}
                  className={style.linkButton}
                >
                  <Button
                    className={style.btnSignup}
                    color="primary"
                    type="submit"
                    variant="outlined"
                    onClick={handleDrawerClose}
                  >
                    Sign up
                  </Button>
                </NavLink>
              )}
              {!props.userInfo && (
                <NavLink
                  exact
                  to={LINKS.PARTICIPANT_LOGIN}
                  className={style.linkButton}
                >
                  <Button
                    className={style.btnLogin}
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={handleDrawerClose}
                  >
                    Log in
                  </Button>
                </NavLink>
              )}

              {props.userInfo && props.userInfo.role === "Reviewer" && (
                <Box>
                  <NavLink
                    exact
                    to={LINKS.REVIEWS}
                    className={style.linkButton}
                  >
                    <Button
                      className={style.btn}
                      color="primary"
                      type="submit"
                      variant="contained"
                      onClick={handleDrawerClose}
                    >
                      My reviews
                    </Button>
                  </NavLink>
                </Box>
              )}

              {/* Button My work */}
              {props.userInfo &&
                props.userInfo.role === "Participant" &&
                props.userInfo.scientificWorkId !== 0 && (
                  <Box>
                    <NavLink
                      exact
                      to={`${LINKS.WORKS}/${props.userInfo.scientificWorkId}`}
                      className={style.linkButton}
                    >
                      <Button
                        className={style.btn}
                        color="primary"
                        type="submit"
                        variant="contained"
                        onClick={handleDrawerClose}
                      >
                        My work
                      </Button>
                    </NavLink>
                  </Box>
                )}

              {/* Button Add work */}
              {props.userInfo &&
                props.userInfo.role === "Participant" &&
                props.userInfo.scientificWorkId === 0 && (
                  <Box>
                    <NavLink
                      exact
                      to={LINKS.ADDING_WORK}
                      className={style.linkButton}
                    >
                      <Button
                        className={style.btn}
                        color="primary"
                        type="submit"
                        variant="contained"
                        onClick={handleDrawerClose}
                      >
                        Add work
                      </Button>
                    </NavLink>
                  </Box>
                )}
            </div>
          </ListItem>
          <ListItem>
            {!props.userInfo ? (
              <span className={style.nameAdress}>
                <p className={style.elements}>
                  Reviewer? <a href={LINKS.REVIEWER_LOGIN}>Log in</a> or
                  <a href={LINKS.REVIEWER_SIGN_UP}> Sign up</a>
                </p>
              </span>
            ) : (
              <span className={style.logoutAddress} onClick={Logout}>
                Log out
              </span>
            )}
          </ListItem>
        </List>
      </Drawer>
      {props.userInfo && clsx(style.hamburger) && (
        <NavLink exact to={LINKS.PROFILE} className={style.linkButton}>
          <img
            className={style.avatar}
            src={
              props.userInfo.photoBase64 ? props.userInfo.photoBase64 : Avatar
            }
            alt="Avatar"
          />
          <div className={style.name}>{props.userInfo.name}</div>
        </NavLink>
      )}
      <div>
        <IconButton onClick={handleDrawer} className={style.hamburger}>
          {open ? (
            <MenuOpen className={style.icon} />
          ) : (
            <MenuIcon className={style.icon} />
          )}
        </IconButton>
        {userPanel()}
        {/* Categories */}
        <Box className={style.boxBottom}>
          <Box>
            <NavLink
              exact
              to="/"
              className={`menu-category ${style.link}`}
              activeClassName={style.activeLink}
            >
              Home
            </NavLink>
          </Box>
          <Box>
            <NavLink
              exact
              to={LINKS.AGENDA}
              className={`menu-category ${style.link}`}
              activeClassName={style.activeLink}
            >
              Agenda
            </NavLink>
          </Box>
          <Box>
            <NavLink
              exact
              to={LINKS.SPEAKERS}
              className={`menu-category ${style.link}`}
              activeClassName={style.activeLink}
            >
              Keynote speakers
            </NavLink>
          </Box>
          {props.userInfo && (
            <Box>
              <NavLink
                exact
                to={LINKS.WORKS}
                className={`menu-category ${style.link}`}
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
              className={`menu-category ${style.link}`}
              activeClassName={style.activeLink}
            >
              About
            </NavLink>
          </Box>
          <Box>
            <NavLink
              exact
              to={LINKS.CONTACT}
              className={`menu-category ${style.link}`}
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
