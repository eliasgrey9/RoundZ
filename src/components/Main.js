import React from "react";
import Homepage from "./Home/Homepage";
import SignUp from "./Signup/SignUp";
import SignIn from "./SignIn/SignIn";
import DashboardHome from "./Dashboard/DashboardHome/DashboardHome";
import InterviewPage from "./InterviewPage/InterviewPage";
import { Routes, Route } from "react-router-dom";
import CreateJobPosition from "./Dashboard/CreateJobPosition/CreateJobPosition";
import ShareInterview from "./Dashboard/ShareInterview/ShareInterview";
import Candidates from "./Dashboard/Candidates/Candidates";
import ReviewAnswer from "./Dashboard/Candidates/ReviewAnswer";
import Map from "./Map";

function Main() {
  return (
    <div className="App">
      <Routes>
        <Route path="/testing" element={<Map />}></Route>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<DashboardHome />}></Route>
        <Route
          path="/dashboard/createJobPosition"
          element={<CreateJobPosition />}
        ></Route>
        <Route
          path="/dashboard/shareInterview/:id"
          element={<ShareInterview />}
        ></Route>

        <Route
          path="/dashboard/position/:title/:id"
          element={<Candidates />}
        ></Route>

        <Route
          path="/dashboard/reviewAnswer/:url"
          element={<ReviewAnswer />}
        ></Route>

        <Route path="/interview" element={<InterviewPage />}></Route>
      </Routes>
    </div>
  );
}

export default Main;

//How to pass headers to an api request
//axios.METHOD(ROUTE_URL, { headers: { Authorization: 'Bearer myVeryLongJWT' } })
