import React from "react";
import "../App.css";
import picture from "../images/empty-image.png";
import AboutInfo from "../components/AboutInfo";
import AboutProfil from "../components/Account/AboutProfil";
import { makeStyles } from "@material-ui/core/styles";

export default function About() {
  const style = makeStyles({
    aboutProfiles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "80px",
      marginBottom: "40px",
    },
    profileColumn: {
      marginLeft: "16px",
      marginRight: "16px",
    },
  })();

  const about = [
    {
      path: picture,
      head: "Info about conference",
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      adnotation: "See keynote speakers ->",
      link: "/speakers",
      isImageRight: true,
    },
    {
      path: picture,
      head: "Some info",
      text:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      adnotation: "See rules for Reviewers and Participants ->",
      link: "/regulations",
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
    path: picture,
    name: "Dominik Tyc",
    description: "a little description of yourself",
  };

  const profile2 = {
    path: picture,
    name: "Kamil Donda",
    description: "a little description of yourself",
  };

  const profile3 = {
    path: picture,
    name: "Sandra Uptas",
    description: "a little description of yourself",
  };

  const profile4 = {
    path: picture,
    name: "Robert Kwoll",
    description: "a little description of yourself",
  };

  return (
    <div>
      <h1>About</h1>

      <div>{aboutList}</div>

      <div className={style.aboutProfiles}>
        <div className={style.profileColumn}>
          <AboutProfil
            path={profile1.path}
            name={profile1.name}
            description={profile1.description}
          />
          <AboutProfil
            path={profile2.path}
            name={profile2.name}
            description={profile2.description}
          />
        </div>
        <div className={style.profileColumn}>
          <AboutProfil
            path={profile3.path}
            name={profile3.name}
            description={profile3.description}
          />
          <AboutProfil
            path={profile4.path}
            name={profile4.name}
            description={profile4.description}
          />
        </div>
      </div>
    </div>
  );
}
