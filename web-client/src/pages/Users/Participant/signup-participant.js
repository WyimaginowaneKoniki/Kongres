import React from "react";
import "../../../App.css";
import SignInUpInfo from "../../../components/SignInUpInfo";
import SignUpForm from "../../../components/SignUpForm";
import axios from "axios";
import { URL, URL_API } from "../../../Constants";

function SignUpParticipant() {
  const signUpParticipantInfo = {
    content:
      "As Participant you can see and add your work.Be reviewed by our Reviewers. If you want to be Reviewer... Sign up here...",
  };

  const signInParticipant = {
    heading: "Sign in",
    content: "If you have already an account, sign in here",
    btn: "Sign in",
    participant: true,
  };

  const Register = (data) => {
    axios
      .post(`${URL_API}/Participant/Register`, data)
      .then((response) => {
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
      <SignInUpInfo content={signUpParticipantInfo.content} />
      <div>
        <SignUpForm
          GetFormData={Register}
          heading={signInParticipant.heading}
          content={signInParticipant.content}
          btn={signInParticipant.btn}
          participant={signInParticipant.participant}
        />
      </div>
    </div>
  );
}

export default SignUpParticipant;
