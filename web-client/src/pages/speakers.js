import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import KeynoteSpeaker from "../components/KeynoteSpeaker";
import picture from "../images/empty-image.png";

export default function Speakers() {
  const style = makeStyles({
    title: {
      marginBottom: "96px",
    },
  })();

  const speakers = [
    {
      photo: picture,
      name: "Dominik Tyc",
      spec: "Team Leader & Backend Developer",
      university: "Silesian University of Technology",
      hobby: "Interested in chess, basketball and games",
      desc: "Ambitious person with many different interests",
    },
    {
      photo: picture,
      name: "Sandra Uptas",
      spec: "UX/UI Designer",
      university: "Silesian University of Technology",
      hobby: "Interested in sleeping, cooking and design",
      desc: "Detail-oriented and creative person",
    },
    {
      photo: picture,
      name: "Kamil Donda",
      spec: "Frontend Developer",
      university: "Silesian University of Technology",
      hobby: "Interested in mobile apps and chess ",
      desc: "Determined to do something great",
    },
    {
      photo: picture,
      name: "Robert Kwoll",
      spec: "Frontend Developer",
      university: "Silesian University of Technology",
      hobby: "Interested in movies, TV series, chess and games ",
      desc: "Positive personality with lots of ideas",
    },
    {
      photo: picture,
      name: "Jorge Patterson",
      spec: "Mathematics Massachusetts",
      university: "Institute of Technology ",
      hobby: "Interested in differential equations and sudoku",
      desc: "Determined to solve problems and share his knowledge",
    },
    {
      photo: picture,
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
      {speakerList}
    </div>
  );
}
