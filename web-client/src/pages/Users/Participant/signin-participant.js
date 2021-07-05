import axios from "axios";
import React from "react";
import "../../../App.css";
import SignInForm from "../../../components/Account/SignInForm";
import { URL, URL_API, LINKS } from "../../../Constants";

export default function SignInParticipant() {
  const signUpRParticipant = {
    heading: "Don't have an account?",
    content: "If you want to take part in conference, join us now!",
    btn: "Sign up",
    signUpLink: `${LINKS.PARTICIPANT_SIGN_UP}`,
    signInAs: "reviewer",
    signInAsOtherLink: `${LINKS.REVIEWER_LOGIN}`,
  };

  const Login = (data) => {
    return axios
      .post(`${URL_API}/participants/login`, data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data);
          window.location.href = URL;
        }

        return response.status;
      })
      .catch((_) => 500);
  };

  return (
    <div>
      <h1>Log in as Participant</h1>

      <SignInForm
        Login={Login}
        heading={signUpRParticipant.heading}
        content={signUpRParticipant.content}
        btn={signUpRParticipant.btn}
        signUpLink={signUpRParticipant.signUpLink}
        signInAs={signUpRParticipant.signInAs}
        signInAsOtherLink={signUpRParticipant.signInAsOtherLink}
      />
    </div>
  );
}
