import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import style from "./shareInterview.module.css";
import { useParams } from "react-router-dom";
const emailjsKey = process.env.REACT_APP_EMAILJS_KEY;
const uuidv4 = require("uuid/v4");

const ShareInterview = () => {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [linkSent, setLinkSent] = useState(false);
  const [randomString, setRandomString] = useState("");
  const [dataFromApi, setDataFromApi] = useState({});
  const [bulkEmailArray, setBulkEmailArray] = useState([]);
  const myForm = useRef();
  const params = useParams();

  //String Generator for dynamic link creation
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generateString = (length) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return setRandomString(result.toLowerCase());
  };

  //Updates invitation numbers by getting the recent amount and passing it to the parent function updateInvitations
  const updateInivitationsOnClientSide = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/jobs/getPositionInvitations/${params.id}`
    );

    updateInvitations(response.data);
  };

  //**SUBMISSION TO INVITE RECIPIENT */
  //Submits email
  //If email is successful creates candidate record
  //Then updates invitations, generates a new string, and Clears formData
  const handleSubmit = (e) => {
    e.preventDefault();
    bulkEmailArray.map((e) => {
      let newRandomStr = "";
      const charactersLength = characters.length;
      for (let i = 0; i < 15; i++) {
        newRandomStr += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      newRandomStr.toLowerCase();

      const dynamicLink = `http://localhost:3000/interview?inviteId=${newRandomStr}&positionId=${params.id}`;
      const currentEmail = e.email;
      const currentName = e.name;

      emailjs.init(emailjsKey);
      emailjs
        .send("service_roundz", "template_roundz", {
          to_email: currentEmail,
          from_name: "Elias's Test Name",
          from_email: "eliasgrey9@gmail.com",
          message: `Invite link: ${dynamicLink}`,
        })
        .then(function (response) {
          if (response) {
            axios.post(
              `http://localhost:8080/api/jobs/addCandidateToPosition/${params.id}`,
              {
                name: currentName,
                email: currentEmail,
                code: newRandomStr,
              }
            );
          }
        })
        .then(function () {
          setLinkSent(true);
        })
        .then(function () {
          generateString(15);
        })
        .then(function () {
          updateInivitationsOnClientSide();
        })
        .then(function () {
          setFormData({ email: "", name: "" });
        })

        .catch(function (error) {
          console.error("Failed to send email: " + error);
        });
    });
  };

  //Sets the values of the input fields for the handleSubmit fn to grab
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const updateInvitations = (response) => {
    const updatedInvites = {
      ...dataFromApi,
      invitations: response.invitations,
    };
    setDataFromApi(updatedInvites);
  };

  useEffect(() => {
    const renderSinglePosition = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/singlePosition/${params.id}`
      );
      setDataFromApi(response.data);
    };
    renderSinglePosition();
  }, [params.id]);

  console.log("BulkEmailArray", bulkEmailArray);

  const updateEmailArray = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.name !== "") {
      const updateEmailArray = [...bulkEmailArray];
      updateEmailArray.push({ name: formData.name, email: formData.email });
      setBulkEmailArray(updateEmailArray);
      setFormData({ email: "", name: "" });
    }
  };

  return (
    <>
      <form ref={myForm} onSubmit={updateEmailArray}>
        {linkSent && <p>Link sent to your email!</p>}
        <input
          type="text"
          name="name"
          placeholder="Recipients name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Recipients email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">+</button>
        <button onClick={handleSubmit}>Send invites</button>
      </form>
      <div>
        {bulkEmailArray.map((e) => (
          <div key={uuidv4()}>
            Name:{e.name}Email{e.email}
          </div>
        ))}
      </div>
    </>
  );
};

export default ShareInterview;
