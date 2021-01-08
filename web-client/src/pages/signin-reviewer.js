import React from "react";
import "../App.css";
import SignInForm from "../components/SignInForm";
import axios from "axios";
import { URL, URL_API } from "../Constants";

function SignInReviewer() {
  const signUpReviewer = {
    heading: "Don't have an account?",
    content: "If you want to review... or something... sign up",
    btn: "Sign up",
    signUpLink: "/signup-reviewer",
    signInAs: "participant",
    signInAsOtherLink: "/signin-participant",
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
      <h1>Sign in as Reviewer</h1>

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

export default SignInReviewer;
