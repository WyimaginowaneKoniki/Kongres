import React from "react";
import "../../../App.css";
import SignInForm from "../../../components/Account/SignInForm";
import axios from "axios";
import { URL, URL_API, LINKS } from "../../../Constants";

export default function SignInReviewer() {
  const signUpReviewer = {
    heading: "Interested in reviewing works?",
    content: "Sign up now and become our reviewer",
    btn: "Sign up",
    signUpLink: LINKS.REVIEWER_SIGN_UP,
    signInAs: "participant",
    signInAsOtherLink: LINKS.PARTICIPANT_LOGIN,
  };

  const Login = (data) => {
    return axios
      .post(`${URL_API}/Reviewer/Login`, data)
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
      <h1>Log in as Reviewer</h1>
      <SignInForm
        Login={Login}
        heading={signUpReviewer.heading}
        content={signUpReviewer.content}
        btn={signUpReviewer.btn}
        signUpLink={signUpReviewer.signUpLink}
        signInAs={signUpReviewer.signInAs}
        signInAsOtherLink={signUpReviewer.signInAsOtherLink}
      />
    </div>
  );
}
