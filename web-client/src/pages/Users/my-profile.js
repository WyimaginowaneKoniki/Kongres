import React, { useEffect } from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import PersonalInformation from "../../components/Account/PersonalInformation";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { URL_API, LINKS } from "../../Constants";
import { useHistory } from "react-router-dom";

export default function MyProfile(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      fontWeight: "bold",
      "@media (max-width: 1050px)": {
        flexWrap: "wrap",
      },
    },
    left: {
      width: "400px",
    },
    right: {
      marginLeft: "64px",
      "@media (max-width: 1050px)": {
        padding: "0.5em",
        marginTop: "64px",
        marginLeft: "0",
      },
    },
    profileLinks: {
      textAlign: "left",
      padding: "1.2em",
      "&:hover": {
        cursor: "pointer",
        color: "#6069A9",
      },
      "@media (max-width: 450px)": {
        padding: "0em",
      },
    },
    smallLinks: {
      fontSize: "16px",
    },
    link: {
      color: "black",
      textDecoration: "none",
      "&:active": {
        color: "#6069A9",
      },
    },
  })();

  const history = useHistory();

  const [userInfo, SetUserInfo] = React.useState({
    name: null,
    surname: null,
    email: null,
    academicTitle: null,
    university: null,
    specialization: null,
    role: null,
    photoBase64: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    (async () => {
      await axios
        .get(`${URL_API}/User/MyProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          SetUserInfo(resp.data);
        })
        .catch((_) => {
          history.push({
            pathname: LINKS.PARTICIPANT_LOGIN,
          });
        });
    })();
  }, [history, userInfo]);

  const [info, SetInfo] = React.useState("#6069A9");

  const moveToLogOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = LINKS.PARTICIPANT_LOGIN;
  };

  return (
    <div>
      <h1 className={style.h1}> My Profile</h1>
      <div className={style.main}>
        <div className={style.left}>
          <p className={style.profileLinks}>
          {userInfo.workId === 0 ?
         <NavLink exact to={LINKS.ADDING_WORK} className={style.link}>
            Add work 
          </NavLink> :
          <NavLink exact to={`${LINKS.WORKS}/${userInfo.workId}`} className={style.link}>
            My work 
          </NavLink>
         }
          </p>
          <p
            className={style.profileLinks}
            style={{ color: info }}
          >
            Personal Information
          </p>

          <p
            className={`${style.profileLinks} ${style.smallLinks}`}
            onClick={moveToLogOut}
          >
            Log out
          </p>
          <NavLink exact to="/regulations" className={style.link}>
            <p className={`${style.profileLinks} ${style.smallLinks}`}>Rules</p>
          </NavLink>
        </div>
        <div className={style.right}>
        <PersonalInformation info={userInfo} />
        </div>
      </div>
    </div>
  );
}
