import axios from "axios";
import React from "react";
import "../../../App.css";
import SignInForm from "../../../components/Account/SignInForm";
import { URL, URL_API, LINKS } from "../../../Constants";

function SignInParticipant() {
  const signUpRParticipant = {
    heading: "Don't have an account?",
    content: "If you want to review... or something... sign up",
    btn: "Sign up",
    signUpLink: `${LINKS.PARTICIPANT_SIGN_UP}`,
    signInAs: "reviewer",
    signInAsOtherLink: `${LINKS.REVIEWER_LOGIN}`,
  };

  const Login = (data) => {
    return axios
      .post(`${URL_API}/Participant/Login`, data)
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
