import React, { useState } from "react";
import style from "./signUp.module.css";
import { Link } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();  
    const createUser = { fullName: fullName, email: email, password: password };
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/signUp',
        createUser
      );

      if(response){
 // Store the authentication token in localStorage
 localStorage.setItem('authToken', response.data.token);
      
 // Change the URL to http://localhost:3000/dashboard/:userId
 window.location.href = `http://localhost:3000/dashboard/${response.data.userId}`;
      }

    } catch (error) {
      console.error(error);
    }
  };
  

 

  return (
    <div className={style.body}>
      <div className={style.logo}>Roundz</div>
      <div className={style.subHeading}>Sign up with RoundZ for free</div>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>Email</label>
        <input
          className={style.input}
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label className={style.label}>Enter your full name</label>
        <input
          className={style.input}
          type="text"
          placeholder="Jane Smith"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        ></input>
        <label className={style.label}>
          Choose a password with at least 8 characters
        </label>
        <input
          className={style.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          className={style.submitBtn}
          type="submit"
          value="Sign Up"
        ></input>
        <div className={style.alreadyHaveAnAccount}>
          Already have an account?
          <div>
            <Link className={style.logIn} to={"/signIn"}>
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
