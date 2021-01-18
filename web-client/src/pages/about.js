import React from "react";
import "../App.css";
import about1 from "../images/about1.png";
import about2 from "../images/about2.png";
import DominikTyc from "../images/dante.png";
import KamilDonda from "../images/dondix.png";
import RobertKwoll from "../images/kwolik-blue.png";
import SandraUptas from "../images/ups-blue.png";
import AboutInfo from "../components/AboutInfo";
import AboutProfil from "../components/Account/AboutProfil";
import { makeStyles } from "@material-ui/core/styles";
import { LINKS } from "../Constants";

export default function About() {
  const style = makeStyles({
    aboutProfiles: {
      display: "flex",
      justifyContent: "center",
      marginTop: "40px",
    },
    profileColumn: {
      marginLeft: "16px",
      marginRight: "16px",
    },
    organizers: {
      marginTop: "120px",
    },
  })();

  const about = [
    {
      path: about1,
      head: "Scienture conference",
      text:
        "Scienture is an international web conference that brings together researchers from a variety of fields: computer science, mathematics, biology, chemistry, physics and geography. The main purpose of this meeting is to inspire and build knowledge, discuss problems and solutions in this area and shape future research directions.",
      adnotation: "See keynote speakers ->",
      link: LINKS.SPEAKERS,
      isImageRight: true,
    },
    {
      path: about2,
      head: "Join us!",
      text:
        "We are looking for reviewers who will review scientific works and participants who want to share their knowledge by uploading their work. Out of the submitted scientific works, our reviewers will select some high-quality papers for presentation at the conference and publication on this website. Only reviewers and participants will be able to view and download accepted scientific works.",
      adnotation: "See rules for Reviewers and Participants ->",
      link: LINKS.REGULATIONS,
    },
  ];

  const aboutList = about.map((a) => (
    <AboutInfo
      path={a.path}
      head={a.head}
      text={a.text}
      adnotation={a.adnotation}
      link={a.link}
      isImageRight={a.isImageRight}
    />
  ));

  const profile1 = {
    path: DominikTyc,
    name: "Dominik Tyc",
    specialization: "Team Leader & Backend Developer",
    hobby: "Interested in chess, basketball and games",
    description: "Ambitious person with many different interest",
  };

  const profile2 = {
    path: KamilDonda,
    name: "Kamil Donda",
    specialization: "Frontend Developer",
    hobby: "Interested in mobile apps and chess ",
    description: "Determined to do something great",
  };

  const profile3 = {
    path: SandraUptas,
    name: "Sandra Uptas",
    specialization: "UX/UI Designer ",
    hobby: "Interested in sleeping, cooking and design ",
    description: "Detail-oriented and creative person",
  };

  const profile4 = {
    path: RobertKwoll,
    name: "Robert Kwoll",
    specialization: "Frontend Developer ",
    hobby: "Interested in movies, TV series, chess and games ",
    description: "Positive personality with lots of ideas",
  };

  return (
    <div>
      <h1>About</h1>

      <div>{aboutList}</div>

      <h2 className={style.organizers}> Organizers</h2>
      <div className={style.aboutProfiles}>
        <div className={style.profileColumn}>
          <AboutProfil
            path={profile1.path}
            name={profile1.name}
            specialization={profile1.specialization}
            hobby={profile1.hobby}
            description={profile1.description}
          />
          <AboutProfil
            path={profile2.path}
            name={profile2.name}
            specialization={profile2.specialization}
            hobby={profile2.hobby}
            description={profile2.description}
          />
        </div>
        <div className={style.profileColumn}>
          <AboutProfil
            path={profile3.path}
            name={profile3.name}
            specialization={profile3.specialization}
            hobby={profile3.hobby}
            description={profile3.description}
          />
          <AboutProfil
            path={profile4.path}
            name={profile4.name}
            specialization={profile4.specialization}
            hobby={profile4.hobby}
            description={profile4.description}
          />
        </div>
      </div>
    </div>
  );
}
