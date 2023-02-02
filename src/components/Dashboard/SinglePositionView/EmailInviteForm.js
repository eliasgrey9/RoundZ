import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const emailjsKey = process.env.REACT_APP_EMAILJS_KEY;

const EmailInviteForm = ({ position }) => {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [linkSent, setLinkSent] = useState(false);

  const myForm = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();

    // You can add code here to generate the dynamic link based on the form data and send it to the end user
    // For example, you can concatenate the form data to create the link:
    const dynamicLink = `https://www.roundz.com/${formData.name}/${formData.email}/${position}`;

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
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <form ref={myForm} onSubmit={handleSubmit}>
      {linkSent && <p>Link sent to your email!</p>}
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailInviteForm;
