import React from "react";
import style from "./signIn.module.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className={style.body}>
      <div className={style.logo}>Roundz</div>

      <form className={style.form}>
        <label className={style.label}>Email</label>
        <input
          className={style.input}
          type="text"
          placeholder="Enter your email"
        ></input>

        <label className={style.label}>Password</label>
        <input
          className={style.input}
          type="password"
          placeholder="Password"
        ></input>
        <input
          className={style.submitBtn}
          type="submit"
          value="Sign In"
        ></input>
      </form>
    </div>
  );
};

export default SignIn;
