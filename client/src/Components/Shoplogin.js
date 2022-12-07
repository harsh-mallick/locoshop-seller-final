import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Loginimage from '../Images/Login Image.png'
import '../css/Schoollogin.css'
import Loadingpage from './Loadingpage';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


const Schoollogin = () => {

  const history = useNavigate()

  const { dispatch } = useContext(UserContext);

  const [interval, setinterval] = useState(false);
  useEffect(() => {
    setinterval(true)
    setTimeout(() => {
      setinterval(false)
    }, 5000)
  }, [])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/usersignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),

    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true })
      window.localStorage.setItem("payload", "true")
      window.alert("Login Successful");
      history('/')
    }
  };



  return (
    <>
      {interval ? (<Loadingpage />) : (
        <section>
          <div className='h1login'>Seller Login</div>
          <div className="conntainer">
            <div className="mains">
              <div className="heading">Seller Login</div>
              <div className="subheading">Login to your seller page!</div>
              <div className="forms">
                <form action="">
                  <div className="labels">Email*</div>
                  <input type="text" name="email" id="schoolemail" className='logintextbox' placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                  <hr className='hr' />
                  <br /><div className="labels">Password*</div>
                  <input type="password" name="password" id="schoolpassword" className='logintextbox' placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <hr className='hr' />
                  <div className="forget">Forget Password?</div>
                  <button className='Loginbtn' onClick={loginUser}>Login</button>
                  <div className="notregister">Not Registered yet? <div className="create">&nbsp;Create a Seller Account</div></div>
                </form>
              </div>
            </div>
            <div className="carsoul">
              <img src={Loginimage} className="loginimg" alt="..." />
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Schoollogin



