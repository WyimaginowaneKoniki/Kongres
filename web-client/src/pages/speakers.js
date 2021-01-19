import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import KeynoteSpeaker from "../components/KeynoteSpeaker";
import DominikTyc from "../images/dante.png";
import KamilDonda from "../images/dondix.png";
import SandraUptas from "../images/ups.png";
import RobertKwoll from "../images/kwolik.png";
import Jorge from "../images/jorge.png";
import Katy from "../images/katy.png";

export default function Speakers() {
  const style = makeStyles({
    title: {
      marginBottom: "96px",
      "@media (max-width: 900px)": {
        marginBottom: "48px",
      },
    },
  })();

  const speakers = [
    {
      photo: DominikTyc,
      name: "Dominik Tyc",
      spec: "Team Leader & Backend Developer",
      university: "Silesian University of Technology",
      hobby: "Interested in chess, basketball and games",
      desc: "Ambitious person with many different interests",
    },
    {
      photo: SandraUptas,
      name: "Sandra Uptas",
      spec: "UX/UI Designer",
      university: "Silesian University of Technology",
      hobby: "Interested in sleeping, cooking and design",
      desc: "Detail-oriented and creative person",
    },
    {
      photo: KamilDonda,
      name: "Kamil Donda",
      spec: "Frontend Developer",
      university: "Silesian University of Technology",
      hobby: "Interested in mobile apps and chess ",
      desc: "Determined to do something great",
    },
    {
      photo: RobertKwoll,
      name: "Robert Kwoll",
      spec: "Frontend Developer",
      university: "Silesian University of Technology",
      hobby: "Interested in movies, TV series, chess and games ",
      desc: "Positive personality with lots of ideas",
    },
    {
      photo: Jorge,
      name: "Jorge Patterson",
      spec: "Mathematics Massachusetts",
      university: "Institute of Technology ",
      hobby: "Interested in differential equations and sudoku",
      desc: "Determined to solve problems and share his knowledge",
    },
    {
      photo: Katy,
      name: "Katy Murray",
      spec: "Geography ",
      university: "University of Washington ",
      hobby: "Interested in climate change and ecology",
      desc:
        "Ready to fight for changes and teach others how to care for the environment",
    },
  ];

  const speakerList = speakers.map((speaker) => (
    <KeynoteSpeaker
      photo={speaker.photo}
      name={speaker.name}
      spec={speaker.spec}
      university={speaker.university}
      hobby={speaker.hobby}
      desc={speaker.desc}
    />
  ));

  return (
    <div>
      <h1 className={style.title}>Keynote speakers</h1>
      <div>{speakerList}</div>
    </div>
  );
}
