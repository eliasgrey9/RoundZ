import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import NavbarNoAuth from "../NavbarNoAuth/NavbarNoAuth";
import interviewPic1 from "../../assets/interviewPic1.jpeg";
import interviewPic2 from "../../assets/interviewPic2.jpeg";

const wordArray = ["connect", "analyze", "streamline"];

const Homepage = () => {
  const [currWord, setCurrWord] = useState(wordArray[0]);

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

  return (
    <>
      <NavbarNoAuth />
      <div className="homeBody">
        <div className="homeSection1">
          <div className="leftHalf">
            <div className="header-text">One platform</div>
            <div className="currWord">to {currWord}</div>
            <div>
              <h3 className="sub-header-text">An app for interviewers.</h3>
            </div>
          </div>
          <div className="rightHalf">
            <div class="right-text">interviews.</div>
            <div class="right-text">made.</div>
            <div class="right-text">easy.</div>
          </div>
        </div>

        <div className="homeSection2">
          <div className="how-it-works-header">How it works</div>

          <div className="oneAndTwoText">
            <div className="textRow">CREATE INTERVIEW</div>
            <div className="textRow">INVITE RECIPIENTS</div>
          </div>

          <div className="oneAndTwoNumber">
            <div className="numbersRowOne">1</div>
            <div className="numbersRowOne">2</div>
          </div>

          <div className="threeAndFourText">
            <div className="textRow">RECIPIENTS RECORD THEMSELVES</div>
            <div className="textRow">REVIEW SUBMISSIONS</div>
          </div>

          <div className="threeAndFourNumbers">
            <div className="numbersRowTwo">3</div>
            <div className="numbersRowTwo">4</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
