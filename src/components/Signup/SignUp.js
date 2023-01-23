import React, { useState } from "react";
import "./signUp.css";
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
    <div className="signUpBody">
      <div className="signUpLeftSide">
        <div>
          <img className="signUpLogo" src={roundzLogoNoBg}></img>
        </div>

        <div className="signUpLeftHeader">Effortlessly Interview</div>
        <div className="signUpLeftSubHeader">
          "RoundZ simplifies and modernizes the interview process."
        </div>
      </div>

      <div className="signUpRightSide">
        <div className="signUpRightHeader">Sign up for RoundZ</div>
        <div className="signUpForm">
          <form className="signUpForm" onSubmit={handleSubmit}>
            <div className="signUpLabel">Email:</div>

            <input
              className="signUpInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <div className="signUpLabel">Password:</div>

            <input
              className="signUpInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="signUpPasswordCharacters">
              Must be 8 characters at least
            </div>
            <br />
            <button className="signUpBtn" type="submit">
              Sign Up
            </button>
          </form>
          <div className="signUpNotAMember">Already a member?</div>
          <div className="signUpContentBelowForm">
            <div>
              <NavLink to="/signIn" className="signUpOrSignInLink">
                Sign in
              </NavLink>
            </div>
            <div>
              <NavLink to="/home" className="signUpOrSignInLink">
                Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
