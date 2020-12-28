import React from 'react';
import '../App.css';
import picture from '../images/empty-image.png'
import AboutInfo from '../components/AboutInfo'
import AboutProfil from '../components/AboutProfil';
import { makeStyles } from '@material-ui/core/styles';

function About(props) {
  const styles = makeStyles({
    main:
    {
      padding: '10%',
    },
    position:
      {
        width: '50%',
        float: 'left',
        paddingBottom: '5%',
      },
  });

  const style = styles();

  const about = [
    {
      path: picture,
      head: "Info about conference",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      adnotation: "See keynote speakers ->",
      link: "/speakers",
      isImageRight: true
    },
    {
      path: picture,
      head: "Some info",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      adnotation: "See rules for Reviewers and Participants ->",
      link: "/regulations",
    }
  ];

  const aboutList = about.map(a =>
    <AboutInfo
      path = {a.path}
      head = {a.head}
      text = {a.text}
      adnotation = {a.adnotation}
      link = {a.link}
      isImageRight = {a.isImageRight}
    />
  )

  const profiles = [
    {
      path: picture,
      name: "Dominik Tyc",
      description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
    },
    {
      path: picture,
      name: "Sandra Uptas",
      description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
    },
    {
      path: picture,
      name: "Kamil Donda",
      description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
    },
    {
      path: picture,
      name: "Robert Kwoll",
      description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
    }
  ];

  const profileList = profiles.map(profile =>
    <div className={style.position}>
      <AboutProfil
        path = {profile.path}
        name = {profile.name}
        description = {profile.description}
      />
    </div>
  )

    return (
      <div>
          <h1>About</h1>

          <div>
            {aboutList}
          </div>

          <div className={style.main}>
            {profileList}
          </div>
      </div>  
    );
}

export default About;