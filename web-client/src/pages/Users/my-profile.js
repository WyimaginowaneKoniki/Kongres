import React, { useEffect } from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import PersonalInformation from "../../components/Account/PersonalInformation";
import ChangePassword from "../../components/Account/ChangePassword";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { URL_API, LINKS } from "../../Constants";
import { useHistory } from "react-router-dom";

export default function MyProfile(props) {
  const style = makeStyles({
    main: {
      width: "80%",
      margin: "auto",
    },
    h1: {
      float: "center",
    },
    left: {
      float: "left",
      width: "400px",
      margin: "auto",
      border: "1px solid black",
    },
    right: {
      float: "right",
      width: "50%",
    },
    h2: {
      textAlign: "left",
      marginTop: "10%",
      marginBottom: "15%",
      marginLeft: "10%",
      "&:hover": {
        cursor: "pointer",
      },
    },
    link: {
      color: "black",
      textDecoration: "none",
      "&:active": {
        color: "blue",
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

  const [panel, SetPanel] = React.useState(true);
  const [info, SetInfo] = React.useState("blue");
  const [password, SetPassword] = React.useState("black");

  const moveToPersonalInformation = () => {
    SetPanel(true);
    SetInfo("blue");
    SetPassword("black");
  };

  const moveToChangePassword = () => {
    SetPanel(false);
    SetPassword("blue");
    SetInfo("black");
  };

  const moveToLogOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = URL;
  };

  return (
    <div className={style.main}>
      <h1 className={style.h1}> My Profile</h1>
      <div className={style.left}>
        <h2 className={style.h2}>
         {userInfo.workId === 0 ?
         <NavLink exact to={LINKS.ADDING_WORK} className={style.link}>
            Add work 
          </NavLink> :
          <NavLink exact to={`${LINKS.WORKS}/${userInfo.workId}`} className={style.link}>
            My work 
          </NavLink>
         }
        </h2>
        <h2
          className={style.h2}
          onClick={moveToPersonalInformation}
          style={{ color: info }}
        >
          Personal Information
        </h2>
        <h2
          className={style.h2}
          onClick={moveToChangePassword}
          style={{ color: password }}
        >
          Change password
        </h2>
        <NavLink exact to="/regulations" className={style.link}>
          <h2 className={style.h2}>Rules</h2>
        </NavLink>
        <h2 className={style.h2} onClick={moveToLogOut}>
          Log out
        </h2>
      </div>
      <div className={style.right}>
        {panel ? <PersonalInformation info={userInfo} /> : <ChangePassword />}
      </div>
    </div>
  );
}
