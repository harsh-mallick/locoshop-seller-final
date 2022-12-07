import {React,useState } from 'react'
import '../css/Home.css'
import logo from '../Images/LocoShop.png'
import about from '../Images/about.jpg'
import Contactus from '../Images/contactus.jpg'

const Home = () => {
  const [user, setUser] = useState({
    cname: "",
    cemail: "",
    cmessage: "",
});

let name, value;
const handleInput = (e) => {
    console.log(e)
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
}


const email = async (e) => {
    e.preventDefault();
    const { cname, cemail, cmessage} = user

    const res = await fetch("/sendEmail", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cname, cemail, cmessage
        })
    });
    const data = await res.json();
    console.log(data)
    console.log(res.status)
    if (res.status === 422 || res.status === 404 || !data) {

        window.alert("Cannot send message")
        console.log("Cannot send message")

    } else if (res.status === 500) {
        window.alert("Internal Server Error")
        console.log("Internal Server Error")
    } else {
        window.alert("Message sent Successfully");
        console.log("Message sent Successfully");
        setUser("")
    };
}

  return (
    <>
      <div className='home-section'>
        <div className="connta">
          <div className="logo">
            <img src={logo} className = 'logoimg' alt="Addmiease Logo" />
          </div>
        </div>
        <div className="main">
          <div className="welcome">Welcome to</div>
          <div className="title">LocoShop</div>
        </div>
      </div>
      <div className="content">
        <div className="maincontent">
          <h1 className='homeh1'>About Us</h1>
          <h5 className='h5'>
            This is a website for the local shops and for consumers. <br/>
            It help the consumers to get the details about the items in the shops nearby easily <br/>
            without going to each and every shop.<br/>
            Consumer can check and go to the suitable shop with the help of a map.<br/><br></br><br></br>
            <div className="conclude">Everything with just one click!<br/>
            Made easy for you!</div> 
          </h5>
          </div>
          <div className="homeimage">
            <img src={about} alt="" />
          </div>
        </div>

        <div className="content">
        <div className="maincontent">
          <h1 className='homeh1'>Developer</h1>
          <h5 className='h5'>
            <b><u>I, Harsh Mallick</u></b> am the Developer of this website. <br/>
            I have made the backend and the frontend of the website. <br/>
            I am fluent in HTML, CSS, Javascript, Reactjs, Mongodb. <br/>
          </h5>
          </div>
        </div>


        <div className="content">
        <div className="maincontent">
          <h1 className='homeh1'>Get in Touch</h1>
          <h5 className='h5'>
            <form action="">
              <input type="text" name="cname" id="cname" className="home_name" placeholder='Enter Your Name' value = {user.cname} onChange = {handleInput}/><br/>
              <input type="text" name="cemail" id="cemail" className="home_email" placeholder='Enter Your email' value = {user.cemail} onChange = {handleInput}/><br/>
              <textarea name="cmessage" id="cmessage" cols="30" rows="10" placeholder='Enter Your message' className='home_message' value = {user.cmessage} onChange = {handleInput}></textarea><br/>
              <button className='Send' onClick={email}>Submit</button>
            </form>
          </h5>
          </div>
          <div className="homeimage">
            <img src={Contactus} alt="" className='contactimage'/>
          </div>
        </div>
        <div className="footer">
          Designed by: Harsh Mallick
        </div>
    </>
  )
}

export default Home