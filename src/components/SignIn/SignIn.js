import React, { useState } from "react";
import "./signIn.css";
import roundzLogoNoBg from "../../assets/roundzLogoNoBg.png";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Send the email and password to your server for sign up
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  }
  return (
    <div className="signInBody">
      <div className="signInLeftSide">
        <div>
          <img className="signInLogo" src={roundzLogoNoBg}></img>
        </div>

        <div className="signInLeftHeader">Effortlessly Interview</div>
        <div className="signInLeftSubHeader">
          "RoundZ simplifies and modernizes the interview process."
        </div>
      </div>

      <div className="signInRightSide">
        <div className="signInRightHeader">Sign in to RoundZ</div>
        <div className="signInForm">
          <form className="signInForm" onSubmit={handleSubmit}>
            <div className="signInLabel">Email:</div>

            <input
              className="signInInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <div className="signInLabel">Password:</div>

            <input
              className="signInInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <button className="signInBtn" type="submit">
              Sign In
            </button>
          </form>
          <div>Not a member?</div>
          <div className="signUpContentBelowForm">
            <div>
              <NavLink to="/signUp" className="signUpOrSignInLink">
                Sign up
              </NavLink>
            </div>
            <div>or</div>
            <div>
              <NavLink to="/home" className="signUpOrSignInLink">
                Go to homepage
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
