import React from "react";
import "../App.css";
import SignInForm from "../components/SignInForm";

function SignInReviewer() {
  const signUpReviewer = {
    heading: "Don't have an account?",
    content: "If you want to review... or something... sign up",
    btn: "Sign up",
  };
  return (
    <div>
      <h1>Sign in as Reviewer</h1>

      <SignInForm
        heading={signUpReviewer.heading}
        content={signUpReviewer.content}
        btn={signUpReviewer.btn}
      />
    </div>
  );
}

export default SignInReviewer;