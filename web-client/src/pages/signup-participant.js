import React from "react";
import "../App.css";
import SignInUpInfo from "../components/SignInUpInfo";
import SignUpForm from "../components/SignUpForm";

function SignUpParticipant(props) {
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

      return (
        <div>
          <h1>Sign up as Participant</h1>
          <SignInUpInfo content={signUpParticipantInfo.content} />
          <div>
            <SignUpForm
                heading={signInParticipant.heading}
                content={signInParticipant.content}
                btn={signInParticipant.btn}
                participant={signInParticipant.participant}
            />
          </div>
        </div>
      )
}

export default SignUpParticipant;