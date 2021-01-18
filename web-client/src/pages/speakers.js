import React from "react";
import "../App.css";
import KeynoteSpeaker from "../components/KeynoteSpeaker";
import picture from "../images/empty-image.png";

export default function Speakers() {
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
      hobby: "Interested in chess, basketball and games",
      desc: "a little description of yourself",
    },
    {
      photo: picture,
      name: "Peter Doe",
      spec: "Mathematic",
      university: "Silesian University of Technology",
      hobby: "Interested in chess, basketball and games",
      desc: "a little description of yourself",
    },
    {
      photo: picture,
      name: "Josephine Doe",
      spec: "Physic",
      university: "Silesian University of Technology",
      hobby: "Interested in chess, basketball and games",
      desc: "a little description of yourself",
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
      <h1>Keynote speakers</h1>
      {speakerList}
    </div>
  );
}
