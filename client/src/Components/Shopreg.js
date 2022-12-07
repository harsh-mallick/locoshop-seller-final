import { React, useState } from 'react'
import '../css/Schoolreg.css'
import registerimage from '../Images/Register.png'

const Schoolreg = () => {
  const [user, setUser] = useState({
    name: "",
    address: "",
    phonenumber: "",
    email: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e)
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  

  const postData = async (e) => {
    e.preventDefault();
    const { name, shop, lane, locality, state, pincode, phonenumber, email, password } = user

    const res = await fetch("/signup-seller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, shop, lane, locality, state, pincode, phonenumber, email, password
      })
    });
    const data = await res.json();
    console.log(data)
    console.log(res.status)
    if (res.status === 422 || res.status === 404 || !data) {

      window.alert("Invalid Registration")
      console.log("Invalid Registration")

    } else if (res.status === 500) {
      window.alert("Internal Server Error")
      console.log("Internal Server Error")
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      window.location.reload(); 
      document.getElementById("name_consumer").innerText = "";
      document.getElementById("house").innerText = "";
      document.getElementById("lane").innerText = "";
      document.getElementById("locality").innerText = "";
      document.getElementById("state").innerText = "";
      document.getElementById("pincode").innerText = "";
      document.getElementById("phonenumber").innerText = "";
      document.getElementById("email").innerText = "";
      document.getElementById("password").innerText = "";
    };
  }
  return (
    <>
        <div className='section' id='consumerreg_section'>
          <div className='h1'>Seller Register</div>
          <div className="conn" id='contten'>
            <div className="form" id='form'>
              <form action="" method='POST'>
                <div className="label" id='label1'>&nbsp;&nbsp;&nbsp; Enter Seller Name:</div>
                <i className='fas fa-solid fa-user'></i>&nbsp;<input type="text" name="name" id="name" className="schoolname" required placeholder='Enter Seller Name.....' value={user.name} onChange={handleInput} /><br /><br />

                <div className="label" id='label2'> Enter Address:</div>
                <i className='fas fa-solid fa-location-arrow'></i>&nbsp;<input type="text" name="shop" id="shop" className="schooladdress" required placeholder='House No.....' value={user.shop} onChange={handleInput} /><br /><br />
                &nbsp;<input type="text" name="lane" id="lane" className="schooladdress" required placeholder='Lane 1' value={user.lane} onChange={handleInput} /><br /><br />
                &nbsp;<input type="text" name="locality" id="locality" className="schooladdress" required placeholder='Locality.....' value={user.locality} onChange={handleInput} /><br /><br />
                &nbsp;<input type="text" name="state" id="state" className="schooladdress" required placeholder='State.....' value={user.state} onChange={handleInput} /><br /><br />
                &nbsp;<input type="text" name="pincode" id="pincode" className="schooladdress" required placeholder='Pin Code.....' value={user.pincode} onChange={handleInput} /><br /><br />

                <div className="label" id='label3'> Enter Phone Number:</div>
                <i className='fas fa-solid fa-phone'></i>&nbsp;<input type="text" name="phonenumber" id="phonenumber" className="schooladdress" required placeholder='Enter Phone Number.....' value={user.phonenumber} onChange={handleInput} /><br /><br />

                <div className="label" id='label4'> Enter Email:</div>
                <i className='fas fa-solid fa-envelope'></i>&nbsp;<input type="email" name="email" id="schoolemail" className="schooladdress" required placeholder='Enter Seller Email.....' value={user.email} onChange={handleInput} /><br /><br />

                <div className="label" id='label5'> Enter  Password:</div>
                <i className='fas fa-solid fa-key'></i>&nbsp;<input type="password" name="password" id="schoolpassword" className="schooladdress" required placeholder='Enter Seller Password.....' value={user.password} onChange={handleInput} /><br /><br />

                <button type="submit" className='registerbtn' onClick={postData}>Register</button>
              </form>
            </div>
            <div className="image">
              <img src={registerimage} alt="" />
            </div>
          </div>
        </div>
    </>

  )
}

export default Schoolreg