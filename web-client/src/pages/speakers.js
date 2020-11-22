import React from 'react';
import '../App.css';
import KeynoteSpeaker from '../components/KeynoteSpeaker'
import picture from '../images/empty-image.png'

function Speakers() {

  const speaker1 = {
    photo: picture,
    name: "John Doe",
    spec: "Mathematic",
    university: "Silesian University of Technology",
    desc: "a little description of yourself"
  };
  const speaker2 = {
    photo: picture,
    name: "Ann Doe",
    spec: "Physic",
    university: "Silesian University of Technology",
    desc: "a little description of yourself"
  };

    return (
      <div>
          <h1>Speakers</h1>
          <KeynoteSpeaker
            photo={speaker1.photo}
            name={speaker1.name}
            spec={speaker1.spec}
            university={speaker1.university}
            desc={speaker1.desc}
          />
          <KeynoteSpeaker
            photo={speaker2.photo}
            name={speaker2.name}
            spec={speaker2.spec}
            university={speaker2.university}
            desc={speaker2.desc}
          />
          <KeynoteSpeaker
            photo={speaker1.photo}
            name={speaker1.name}
            spec={speaker1.spec}
            university={speaker1.university}
            desc={speaker1.desc}
          />
          <KeynoteSpeaker
            photo={speaker2.photo}
            name={speaker2.name}
            spec={speaker2.spec}
            university={speaker2.university}
            desc={speaker2.desc}
          />
      </div>  
    );
}

export default Speakers;