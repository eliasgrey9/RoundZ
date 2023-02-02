import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";

const emailjsKey = process.env.REACT_APP_EMAILJS_KEY;

const EmailInviteForm = ({ position_id }) => {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [linkSent, setLinkSent] = useState(false);
  const [randomString, setRandomString] = useState("");

  const myForm = useRef();

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generateString = (length) => {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return setRandomString(result.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dynamicLink = `https://www.roundz.com/${randomString}`;

    axios.post(
      `http://localhost:8080/api/jobs/addInviteeToPosition/${position_id}`,
      {
        name: formData.name,
        email: formData.email,
        code: randomString,
      }
    );

    emailjs.init(emailjsKey);

    // Send the dynamic link to the end user, for example by email:
    emailjs
      .send("service_roundz", "template_roundz", {
        to_email: formData.email,
        from_name: "Elias's Test Name",
        from_email: "eliasgrey9@gmail.com",
        message: `Check out this link ${dynamicLink}`,
      })
      .then(function (response) {
        console.log("Email was sent! Here is the server response", response);
      })
      .catch(function (error) {
        console.error("Failed to send email: " + error);
      });

    setLinkSent(true);
    generateString(15);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    generateString(15);
  };
  return (
    <form ref={myForm} onSubmit={handleSubmit}>
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
      <button type="submit">Send Invite</button>
    </form>
  );
};

export default EmailInviteForm;
