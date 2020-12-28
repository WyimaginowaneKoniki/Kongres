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
  return (
    <div>
      <h1>Sign in as Participant</h1>

      <SignInForm
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