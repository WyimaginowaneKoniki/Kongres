import React from "react";
import "../../../App.css";
import SignInUpInfo from "../../../components/Account/SignInUpInfo";
import SignUpForm from "../../../components/Account/SignUpForm";
import axios from "axios";
import { URL, URL_API, LINKS } from "../../../Constants";

export default function SignUpReviewer() {
  const signUpReviewerInfo = {
    content:
      "Share your experience and review others scientific works! However, if you want to join us as Participant, ",
    link: `${LINKS.PARTICIPANT_SIGN_UP}`,
    textLink: "go to signup page",
  };

  const signInReviewer = {
    heading: "Already have an account?",
    content: "",
    btn: "Log in",
    signInLink: "/reviewer/login",
  };

  const Register = (data) => {
    axios.post(`${URL_API}/Reviewer/Register`, data).then((response) => {
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
      <h1>Sign up as Reviewer</h1>
      <SignInUpInfo
        content={signUpReviewerInfo.content}
        link={signUpReviewerInfo.link}
        textLink={signUpReviewerInfo.textLink}
      />
      <div>
        <SignUpForm
          GetFormData={Register}
          heading={signInReviewer.heading}
          content={signInReviewer.content}
          btn={signInReviewer.btn}
          signInLink={signInReviewer.signInLink}
        />
      </div>
    </div>
  );
}
