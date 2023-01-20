import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import NavbarNoAuth from "../NavbarNoAuth/NavbarNoAuth";
import interviewPic1 from "../../assets/interviewPic1.jpeg";
import interviewPic2 from "../../assets/interviewPic2.jpeg";

const wordArray = ["connect", "analyze", "streamline"];

const Homepage = () => {
  const [currWord, setCurrWord] = useState(wordArray[0]);
  const [isActive, setIsActive] = useState(true);

  const index = useRef(0);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        index.current++;
        setCurrWord(wordArray[index.current]);
        if (index.current === wordArray.length - 1) {
          setIsActive(false);
        }
      }, 2000);
    }
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
          </div>
          <div className="rightHalf">
            <div>
              <img className="interviewPic1" src={interviewPic1}></img>
              <img className="interviewPic2" src={interviewPic2}></img>
            </div>
          </div>
        </div>
        <div className="homeSection2"></div>
      </div>
    </>
  );
};

export default Homepage;
