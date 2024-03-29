import React, { useState } from "react";
import style from "./signIn.module.css";
import { Link } from "react-router-dom";
import axios from 'axios'
import logo from '../../assets/logo.svg'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signInUser = { email: email, password: password };
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/signIn',
        signInUser,
      
      );

      
      if (response) {
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
      <div className={style.logo}><img src={logo}></img></div>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputAndLabel}>
        <label className={style.label}>Email</label>
        <input
          className={style.input}
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
</div>

        <div className={style.textInputFields}>
        <div className={style.inputAndLabel}>
        <label className={style.label}>Password</label>
        <input
          className={style.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        </div>

        </div>

        <input
          className={style.submitBtn}
          type="submit"
          value="Sign In"
        ></input>

        <div className={style.needAnAccount}>
          Need an account?
          <div>
            <Link className={style.signUp} to={"/signUp"}>
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
