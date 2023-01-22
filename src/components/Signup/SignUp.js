import React from "react";
import "./signUp.css";
import roundzLogoNoBg from "../../assets/roundzLogoNoBg.png";

const SignUp = () => {
  return (
    <div className="body">
      <div className="leftSide">
        <div>
          <img className="signUpLogo" src={roundzLogoNoBg}></img>
        </div>

        <div className="left-header">Effortlessly Interview</div>
        <div className="left-sub-header">
          "RoundZ simplifies and modernizes the interview process."
        </div>
      </div>

      <div className="rightSide">
        <div className="right-header">Sign up for RoundZ</div>
        <div>
          <form>
            <div>
              <p>E-mail</p>
              <input></input>
              <p>Password</p>
              <input></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
