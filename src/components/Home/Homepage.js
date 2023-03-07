import React from "react";
import style from "./Homepage.module.css";
import Navbar from "./Navbar/Navbar";
import schedulingIcon from "../../assets/schedulingIcon.svg";
import peopleIcon from "../../assets/people.svg";
import thumbsUpIcon from "../../assets/thumbsUp.svg";
import recordingIcon from "../../assets/recording.svg";
import Footer from "../Footer/Footer";

const Homepage = () => {
  return (
    <div className={`${style.body}`}>
      <Navbar />
      <div>
        <div className={style.interviewsMadeEasy}>
          <div className={style.interviews}>Interviews</div>
          <div className={style.madeEasy}>Made Easy</div>

          <div className={style.mainSubheading}>
            <div className={style.onePlatformOneFocus}>
              <div>One Platform. </div>
              <div>One Focus.</div>
            </div>

            <div>
              <button className={style.getStartedBtn}>Get Started</button>
            </div>
          </div>

          <div className={style.theFourSquares}>
            <div>
              <div className={style.square}>
                <div className={style.squareContent}>
                  <div>
                    <img src={schedulingIcon}></img>
                  </div>
                  <div>No more scheduling</div>
                </div>
              </div>
            </div>
            <div>
              <div className={style.square}>
                <div className={style.squareContent}>
                  <div>
                    <img src={peopleIcon}></img>
                  </div>
                  <div>More candidates in less time</div>
                </div>
              </div>
            </div>
            <div>
              <div className={style.square}>
                <div className={style.squareContent}>
                  <div>
                    <img src={recordingIcon}></img>
                  </div>
                  <div>Review recorded interviews</div>
                </div>
              </div>
            </div>
            <div>
              <div className={style.square}>
                <div className={style.squareContent}>
                  <div>
                    <img src={thumbsUpIcon}></img>
                  </div>
                  <div>Great candidate experience</div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.oneWayVideoSoftware}>
            Easy interview <div className={style.softwareColor}> software</div>
          </div>
          <div className={style.visualSection}>
            <div className={style.vsParagraph}>
              <div>
                <h1>No more scattered scheduling</h1>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
            <div className={style.vsImage}></div>
          </div>

          <div className={style.visualSection}>
            <div className={style.vsImage}></div>

            <div className={style.vsParagraph}>
              <div>
                <h1>More candidates. Less Time.</h1>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
          <div className={style.visualSection}>
            <div className={style.vsParagraph}>
              <div>
                <h1>Review recorded interviews</h1>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
            <div className={style.vsImage}></div>
          </div>
          <div className={style.visualSection}>
            <div className={style.vsImage}></div>

            <div className={style.vsParagraph}>
              <div>
                <h1>Great candidate experience</h1>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
