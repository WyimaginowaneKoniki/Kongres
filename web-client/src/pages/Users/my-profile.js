import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import PersonalInformation from "../../components/Account/PersonalInformation";
import ChangePassword from "../../components/Account/ChangePassword";
import { NavLink } from "react-router-dom";

export default function MyProfile(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      "@media (max-width: 1050px)": {
        flexWrap: "wrap",
      },
    },
    left: {
      width: "400px",
      border: "2px solid black",
    },
    right: {
      marginLeft: "64px",
      "@media (max-width: 1050px)": {
        padding: "0.5em",
        marginTop: '64px',
        marginLeft: "0",
      },
    },
    h2: {
      textAlign: "left",
      padding: "1.5em",
      "&:hover": {
        cursor: "pointer",
        color: "#6069A9",
      },
      "@media (max-width: 450px)": {
        padding: "0em",
      },
    },
    link: {
      color: "black",
      textDecoration: "none",
      "&:active": {
        color: "#6069A9",
      },
    },
  })();

  const myProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "John.doe@gmail.com",
    academicTitle: "",
    university: "",
    specialization: "Biology",
    participant: props?.userInfo?.role,
  };

  const [panel, SetPanel] = React.useState(true);
  const [info, SetInfo] = React.useState("#6069A9");
  const [password, SetPassword] = React.useState("black");

  const moveToWork = () => {};

  const moveToPersonalInformation = () => {
    SetPanel(true);
    SetInfo("#6069A9");
    SetPassword("black");
  };

  const moveToChangePassword = () => {
    SetPanel(false);
    SetPassword("#6069A9");
    SetInfo("black");
  };

  const moveToLogOut = () => {};

  return (
    <div>
      <h1 className={style.h1}> My Profile</h1>
      <div className={style.main}>
        <div className={style.left}>
          <h2 className={style.h2} onClick={moveToWork}>
            Add work / My work
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
          <h2 className={style.h2} onClick={moveToLogOut}>
            Log out
          </h2>
          <NavLink exact to="/regulations" className={style.link}>
            <h2 className={style.h2}>Rules</h2>
          </NavLink>
        </div>
        <div className={style.right}>
          {panel ? (
            <PersonalInformation
              firstName={myProfile.firstName}
              lastName={myProfile.lastName}
              email={myProfile.email}
              academicTitle={myProfile.academicTitle}
              university={myProfile.university}
              specialization={myProfile.specialization}
              participant={myProfile.participant}
            />
          ) : (
            <ChangePassword />
          )}
        </div>
      </div>
    </div>
  );
}
