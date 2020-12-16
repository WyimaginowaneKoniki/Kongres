import React from "react";
import "../App.css";
import SignInUpInfo from "../components/SignInUpInfo";
import SignInUpOther from "../components/SignInUpOther";
import SignUpForm from "../components/SignUpForm";

function SignUpReviewer() {
  const signUpReviewerInfo = {
    content:
      "As Reviewer you can see and review other works. If you want to join us and rate scientific works... Sign up here...",
  };

  const signInReviewer = {
    heading: "Sign in",
    content: "If you have already an account, sign in here",
    btn: "Sign in",
  };
  return (
    <div>
      <h1>Sign up as Reviewer</h1>
      <SignInUpInfo content={signUpReviewerInfo.content} />
      <div>
        <SignUpForm
          heading={signInReviewer.heading}
          content={signInReviewer.content}
          btn={signInReviewer.btn}
        />
      </div>
    </div>
  );
}

export default SignUpReviewer;
