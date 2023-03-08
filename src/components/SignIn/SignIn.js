import React, { useState } from "react";
import style from "./signIn.module.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email: ", email, "Password: ", password);
  };

  return (
    <div className={style.body}>
      <div className={style.logo}>Roundz</div>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>Email</label>
        <input
          className={style.input}
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>

        <label className={style.label}>Password</label>
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
          value="Sign In"
        ></input>

        <div className={style.alreadyHaveAnAccount}>
          Need an account?
          <div>
            <Link className={style.logIn} to={"/signUp"}>
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
