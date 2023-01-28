import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import NavbarNoAuth from "../NavbarNoAuth/NavbarNoAuth";
import NavbarAuth from "../NavbarAuth/NavbarAuth";
import roundzLogoNoBg from "../../assets/roundzLogoNoBg.png";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import interviewPic1 from "../../assets/interviewPic1.jpeg";
import interviewPic2 from "../../assets/interviewPic2.jpeg";
import interviewPic3 from "../../assets/interviewPic3.jpeg";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const wordArray = ["connect", "review", "streamline"];
  const [currWord, setCurrWord] = useState(wordArray[0]);
  const [authenticated, setAuthenticated] = useState(true);

  //This changes the wordArray on a timed interval
  const index = useRef(0);
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setCurrWord(wordArray[index.current]);
      if (index.current === wordArray.length - 1) {
        index.current = 0;
      } else {
        index.current++;
      }
    }, 2000);
    return () => clearInterval(interval);
  });
  //END

  const toggleNav = () => {
    setAuthenticated(!authenticated);
  };

  return (
    <>
      {authenticated ? <NavbarAuth /> : <NavbarNoAuth />}

      <div className="homeBody">
        <button onClick={toggleNav}>+</button>

        <div className="homeSection1">
          <div className="leftHalf">
            <div className="header-text">One platform</div>
            <div className="currWord">to {currWord}</div>
            <div>
              <h3 className="sub-header-text">An app for interviewers.</h3>
            </div>
          </div>
          <div className="rightHalf">
            <div className="right-text">interviews.</div>
            <div className="right-text">made.</div>
            <div className="right-text">easy.</div>
          </div>
        </div>

        <div className="homeSection2">
          <div className="noMoreSchedulingHeader">no more scheduling.</div>

          <div className="allTextInrow">
            <div className="eachTextInRow">CREATE INTERVIEW</div>
            <div className="eachTextInRow">INVITE RECIPIENTS</div>
          </div>

          <div className="allNumbersInRow">
            <div className="eachNumberInRow">1</div>
            <div className="eachNumberInRow">2</div>
          </div>

          <div className="allTextInrow">
            <div className="eachTextInRow">RECIPIENTS RECORD</div>
            <div className="eachTextInRow">REVIEW SUBMISSIONS</div>
          </div>

          <div className="allNumbersInRow">
            <div className="eachNumberInRow">3</div>
            <div className="eachNumberInRow">4</div>
          </div>
        </div>

        <div id="about" className="homeSection3">
          <div className="logoDiv">
            <div className="logoBorder"></div>
            <img
              className="roundzLogoNoBg"
              alt="roundz logo"
              src={roundzLogoNoBg}
            ></img>
          </div>

          <div className="textColumn">
            <div className="makeLessWorkHeader">Make less work.</div>
            <div className="lessWorkParagraph">
              RoundZ is a tool that streamlines the initial interview process,
              allowing interviewers to create their own questions for applicants
              to answer in a video recording, eliminating the need for initial
              in-person or phone interviews. The interviewer can access the
              video submissions and gain a more comprehensive understanding of
              the applicant while saving at least 50% of their time.
            </div>
          </div>
        </div>

        <div className="homeSection4">
          <Contact />
          <div className="contactImagesColumn">
            <img className="contactImg1" src={interviewPic1}></img>
            <img className="contactImg2" src={interviewPic2}></img>
            <img className="contactImg3" src={interviewPic3}></img>
          </div>
        </div>
        {!authenticated ? (
          <div className="homeSection5">
            <div className="readyToStartHeader">Ready to get started?</div>

            <div>
              <NavLink to="/signUp" className="navLink">
                <button className="sign-up-btn">Sign Up Free</button>
              </NavLink>
            </div>
          </div>
        ) : null}

        <Footer />
      </div>
    </>
  );
};

export default Homepage;
