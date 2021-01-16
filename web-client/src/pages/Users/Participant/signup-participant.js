import React from "react";
import "../../../App.css";
import SignInUpInfo from "../../../components/Account/SignInUpInfo";
import SignUpForm from "../../../components/Account/SignUpForm";
import axios from "axios";
import { URL, URL_API, LINKS } from "../../../Constants";

export default function SignUpParticipant() {
  const signUpParticipantInfo = {
    content:
      "As Participant you can see and add your work. Be reviewed by our Reviewers. If you want to be Reviewer... Sign up ",
    signUpAsOtherLink: `${LINKS.REVIEWER_SIGN_UP}`,
  };

  const signInParticipant = {
    heading: "Sign in",
    content: "If you have already an account, sign in here",
    btn: "Sign in",
    participant: true,
    signInLink: `${LINKS.PARTICIPANT_LOGIN}`,
  };

  const Register = (data) => {
    axios.post(`${URL_API}/Participant/Register`, data).then((response) => {
      // OK
      if (response.status === 200) {
        window.location.href = URL;
      }
      // User conflict/user already exists in db
      else if (response.status === 409) {
        // show error or smth
      }
    });
  };

  return (
    <div>
      <h1>Sign up as Participant</h1>
      <SignInUpInfo
        content={signUpParticipantInfo.content}
        signUpAsOtherLink={signUpParticipantInfo.signUpAsOtherLink}
      />
      <div>
        <SignUpForm
          GetFormData={Register}
          heading={signInParticipant.heading}
          content={signInParticipant.content}
          btn={signInParticipant.btn}
          participant={signInParticipant.participant}
          signInLink={signInParticipant.signInLink}
        />
      </div>
    </div>
  );
}
