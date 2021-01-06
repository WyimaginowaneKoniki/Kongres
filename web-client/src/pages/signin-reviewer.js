import React from "react";
import "../App.css";
import SignInForm from "../components/SignInForm";
import axios from "axios";

function SignInReviewer() {
  const signUpReviewer = {
    heading: "Don't have an account?",
    content: "If you want to review... or something... sign up",
    btn: "Sign up",
    signUpLink: "/signup-reviewer",
    signInAs: "participant",
    signInAsOtherLink: "/signin-participant",
  };

  const Register = (data) => {
    axios
      .post("https://localhost:5001/api/Reviewer/Login", data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data);

          window.location.href = "https://localhost:5001";
        } else if (response.status === 404) {
          // invalid credentials
        }
      })
      .catch(() => console.log("errr"));
  };

  return (
    <div>
      <h1>Sign in as Reviewer</h1>

      <SignInForm
        GetFormData={Register}
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
