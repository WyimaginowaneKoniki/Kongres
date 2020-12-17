import React from 'react';
import '../App.css';
import KeynoteSpeaker from '../components/KeynoteSpeaker'
import picture from '../images/empty-image.png'

function Speakers() {

  const speakers = [
    {
      photo: picture,
      name: "John Doe",
      spec: "Mathematic",
      university: "Silesian University of Technology",
      desc: "a little description of yourself"
    },
    {
      photo: picture,
      name: "Ann Doe",
      spec: "Physic",
      university: "Silesian University of Technology",
      desc: "a little description of yourself"
    },
    {
      photo: picture,
      name: "Peter Doe",
      spec: "Mathematic",
      university: "Silesian University of Technology",
      desc: "a little description of yourself"
    },
    {
      photo: picture,
      name: "Josephine Doe",
      spec: "Physic",
      university: "Silesian University of Technology",
      desc: "a little description of yourself"
    },
  ];

  const speakerList = speakers.map(speaker =>
    <KeynoteSpeaker
      photo={speaker.photo}
      name={speaker.name}
      spec={speaker.spec}
      university={speaker.university}
      desc={speaker.desc}
    />  
  )

  return (
    <div>
        <h1>Speakers</h1>
        {speakerList}
    </div>  
  );
}

export default Speakers;