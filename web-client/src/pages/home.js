import React from "react";
import "../App.css";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
} from "@material-ui/core/";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@material-ui/lab/";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { LINKS } from "../Constants";
import bckg1 from "../images/logo-values.png";

export default function Home() {
  const style = makeStyles({
    main: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      display: "flex",
      marginTop: "264px",
      fontSize: "48px",
      "@media (max-width: 1280px)": {
        fontSize: "24px",
      },
    },
    buttons: {
      display: "flex",
      marginBottom: "56px",
      "@media (max-width: 1280px)": {
        flexWrap: "wrap",
      },
    },
    photo: {
      width: "75vw",
      marginBottom: "56px",
    },
    btn: {
      width: "204px",
      height: "70px",
      fontSize: "32px",
      marginRight: "40px",
      textTransform: "none",
      "@media (max-width: 1280px)": {
        marginTop: "32px",
      },
    },
    btn1: {
      width: "204px",
      height: "70px",
      fontSize: "32px",
      marginRight: "40px",
      textTransform: "none",
      backgroundColor: "#FFFFFF",
      "@media (max-width: 1280px)": {
        marginTop: "32px",
      },
    },
    btnNext: {
      marginLeft: '8px',
    },
    link: {
      textDecoration: "none",
    },
    text: {
      fontWeight: "bold",
      textAlign: "left",
    },
    resetContainer: {
      padding: "0.5em",
    },
    panel: {
      display: "flex",
      textAlign: "left",
      marginBottom: "125px",
      "@media (max-width: 1280px)": {
        flexWrap: "wrap",
      },
    },
    panelComponents: {
      width: "80%",
      padding: "1em",
    },
    information: {
      textAlign: "left",
      marginBottom: "128px",
    },
    paper: {
      padding: "0.5em",
    },
    paperLeft: {
      padding: "0.5em",
      textAlign: "left",
    },
  })();

  function getSteps() {
    return [
      "Signing up as a Participant",
      "Browsing the scientific works of others",
      "Adding own work",
      "Waiting for reviews",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return "First you need to join us as a Participant!";
      case 1:
        return `As a new member of our community you will have access to a 
                lot of scientific works that you can also download!`;
      case 2:
        return `If you want to pass your knowledge on, add a new scientific work!`;
      case 3:
        return `After submitting your work, you will be waiting for a review from 
                the randomly selected reviewers. Until the work is positively rated,
                only you and your reviewers will have access to it!`;
      default:
        return "Unknown step";
    }
  }

  function getStepsTwo() {
    return ["Adding a review", "Review of other works", "Downloading works"];
  }

  function getStepTwoContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return "An ad group contains one or more ads which target a shared set of keywords.";
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return "Unknown step";
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [activeStepTwo, setActiveStepTwo] = React.useState(0);
  const stepsTwo = getStepsTwo();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleNextTwo = () => {
    setActiveStepTwo((prevActiveStepTwo) => prevActiveStepTwo + 1);
  };

  const handleBackTwo = () => {
    setActiveStepTwo((prevActiveStepTwo) => prevActiveStepTwo - 1);
  };

  const handleResetTwo = () => {
    setActiveStepTwo(0);
  };

  return (
    <div className={style.main}>
      <div className={style.title}>
        <h2>Let&apos;s start our future!</h2>
      </div>
      <div className={style.buttons}>
        <NavLink exact to={LINKS.PARTICIPANT_SIGN_UP} className={style.link}>
          <Button variant="outlined" color="primary" className={style.btn1}>
            Sign up
          </Button>
        </NavLink>
        <NavLink exact to={LINKS.PARTICIPANT_LOGIN} className={style.link}>
          <Button variant="contained" color="primary" className={style.btn}>
            Log in
          </Button>
        </NavLink>
      </div>

      <img src={bckg1} alt="" className={style.photo} />

      <div>
        <p className={style.information}>
        Welcome to the Scienture Conference, an international
        science conference that brings together researchers from various fields:
        computer science, mathematics, biology, chemistry, physics and geography.
        The main purpose of this meeting is to inspire and build knowledge, 
        discuss problems and solutions in this area and shape future research directions.
        On the [Agenda] you can see upcoming events, while on the [Keynote Speakers]
        you can read about our leaders. Don't wait any longer, join now!
        </p>
      </div>
      <div className={style.panel}>
        <div className={style.panelComponents}>
          <p className={style.text}>Join us as Participant</p>
          <p>
            As a participant, you will have access to a wide database of interesting scientific works.
            Develop your knowledge in selected areas! Or maybe you want to share your 
            knowledge and publish your own scientific work? We are waiting for you!
          </p>
        </div>
        <div className={style.panelComponents}>
          <p className={style.text}>What should you do?</p>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={style.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        variant="outlined"
                        color="primary"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={style.btnNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={style.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} variant="outlined" color="primary">
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </div>

      <div className={style.panel}>
        <div className={style.panelComponents}>
          <p className={style.text}>What should you do?</p>
          <Stepper activeStep={activeStepTwo} orientation="vertical">
            {stepsTwo.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepTwoContent(index)}</Typography>
                  <div>
                    <div>
                      <Button
                        disabled={activeStepTwo === 0}
                        variant="outlined"
                        color="primary"
                        onClick={handleBackTwo}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={style.btnNext}
                        onClick={handleNextTwo}
                      >
                        {activeStepTwo === stepsTwo.length - 1
                          ? "Finish"
                          : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStepTwo === stepsTwo.length && (
            <Paper square elevation={0} className={style.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button
                onClick={handleResetTwo}
                variant="outlined"
                color="primary"
              >
                Reset
              </Button>
            </Paper>
          )}
        </div>
        <div className={style.panelComponents}>
          <p className={style.text}>Join us as Reviewer</p>
          <p>
            Scienture is an international web conference that brings together
            researchers from a variety of fields: computer science, mathematics,
            biology, chemistry, physics and geography. The main purpose of this
            meeting is to inspire and build knowledge, discuss problems and
            solutions in this area and shape future research directions.
          </p>
        </div>
      </div>
      <div>
        <p className={style.information}>
          Scienture is an international web conference that brings together
          researchers from a variety of fields: computer science, mathematics,
          biology, chemistry, physics and geography. The main purpose of this
          meeting is to inspire and build knowledge, discuss problems and
          solutions in this area and shape future research directions.
        </p>
      </div>
      <div>
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                9:30 am
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={style.paperLeft}>
                <Typography variant="h6" component="h1">
                  Register
                </Typography>
                <Typography>Because you need strength</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                10:00 am
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={style.paper}>
                <Typography variant="h6" component="h1">
                Adding works
                </Typography>
                <Typography>Because it&apos;s awesome!</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <HotelIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={style.paperLeft}>
                <Typography variant="h6" component="h1">
                Draw of reviewers
                </Typography>
                <Typography>Because you need rest</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <RepeatIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={style.paper}>
                <Typography variant="h6" component="h1">
                  Adding reviews and improving work
                </Typography>
                <Typography>Because this is the life you love!</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <RepeatIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={style.paperLeft}>
                <Typography variant="h6" component="h1">
                  End of Congress
                </Typography>
                <Typography>Because this is the life you love!</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}
