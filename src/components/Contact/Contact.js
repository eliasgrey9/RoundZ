import "./contact.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ozhvz9o", "Lacroi", form.current, "kJM0AENzmHeMnv21a")
      .then(
        (result) => {
          e.target.reset();
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <section id="contact">
      <form className="contactForm" ref={form} onSubmit={sendEmail}>
        <div className="contactHeader">Contact us</div>
        <input
          className="contactInput"
          type="text"
          name="name"
          placeholder="Your Full Name"
          required
        />
        <input
          className="contactInput"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <textarea
          className="contactTextArea"
          name="message"
          rows="7"
          placeholder="Your Message"
          required
        ></textarea>
        <button className="contactSendMsgBtn" type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
