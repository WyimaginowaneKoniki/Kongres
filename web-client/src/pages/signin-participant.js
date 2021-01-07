import axios from "axios";
import React from "react";
import "../App.css";
import SignInForm from "../components/SignInForm";

function SignInParticipant() {
  const signUpRParticipant = {
    heading: "Don't have an account?",
    content: "If you want to review... or something... sign up",
    btn: "Sign up",
    signUpLink: "/signup-participant",
    signInAs: "reviewer",
    signInAsOtherLink: "/signin-reviewer",
  };

  const Login = (data) => {
    axios
      .post("https://localhost:5001/api/Participant/Login", data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data);

          window.location.href = "https://localhost:5001";
        }
      }).catch((error) => {
        return false;
      });
  };

  return (
    <div>
      <h1>Sign in as Participant</h1>

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

export default SignInParticipant;
