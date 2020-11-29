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

  const about1 = {
    path: picture,
    head: "Info about conference",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    adnotation: "See keynote speakers ->",
    link: "/speakers",
    isImageRight: true
  };

  const about2 = {
    path: picture,
    head: "Some info",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    adnotation: "See rules for Reviewers and Participants ->",
    link: "/regulations",
  };

  const profil1 = {
    path: picture,
    name: "Dominik Tyc",
    description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
  };

  const profil2 = {
    path: picture,
    name: "Sandra Uptas",
    description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
  };

  const profil3 = {
    path: picture,
    name: "Kamil Donda",
    description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
  };

  const profil4 = {
    path: picture,
    name: "Robert Kwoll",
    description: "a little description of yourself i mean cos tam cos tam fffffffffffff zobacz to sam",
  };

    return (
      <div>
          <h1>About</h1>

          <div>
            <AboutInfo
              path = {about1.path}
              head = {about1.head}
              text = {about1.text}
              adnotation = {about1.adnotation}
              link = {about1.link}
              isImageRight = {about1.isImageRight}
            />

            <AboutInfo
              path = {about2.path}
              head = {about2.head}
              text = {about2.text}
              adnotation = {about2.adnotation}
              link = {about2.link}
              isImageRight = {about2.isImageRight}
            />
          </div>

          <div className={style.main}>
            <div className={style.position}>
              <AboutProfil
                path = {profil1.path}
                name = {profil1.name}
                description = {profil1.description}
              />
            </div>

            <div className={style.position}>
              <AboutProfil
                path = {profil2.path}
                name = {profil2.name}
                description = {profil2.description}
              />
              </div>

              <div className={style.position}>
              <AboutProfil
                path = {profil3.path}
                name = {profil3.name}
                description = {profil3.description}
              />
            </div>
            
            <div className={style.position}>
              <AboutProfil
                path = {profil4.path}
                name = {profil4.name}
                description = {profil4.description}
              />
              </div>
            </div>
      </div>  
    );
}

export default About;