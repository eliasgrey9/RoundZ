import React, {useState} from "react";
import style from './signIn.module.css'
import Navbar from './Navbar/Navbar'
import backArrow from '../../assets/backArrow.svg'
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom";


const SignIn = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
  <div className={style.body}>
    <Navbar />

    <div className={style.backArrow}><Link to={'/'}><img src={backArrow}></img></Link></div>
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.formLabel}>
      Username:
      </label>
        <input className={style.formInput} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />

      <label className={style.formLabel}>
        Password:
        </label>
        <input className={style.formInput} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
     
      <button className={style.submitBtn} type="submit">Sign In</button>
    </form>
    <Footer />
  </div>
)};

  
export default SignIn;
