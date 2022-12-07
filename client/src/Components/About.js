import React, { useEffect, useState } from 'react';
import userpng from '../Components/user.png';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css'

export default function Contactus() {
    const history = useNavigate()
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                mode: "no-cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })

            const data = await res.json();
            console.log(data)
            setUserData(data)

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (error) {
            history('/seller-login')
            console.log(error)
        }
    }

    useEffect(() => {
        callAboutPage();
    });

    return (
        <section>
            <div className="sections">
            <div className="conntainers">
                <img src={userpng} alt="" className='userpng'/><br/>
                <div className="name"><i className="fas fa-solid fa-user">&nbsp;&nbsp;&nbsp;</i>{userData.name}</div>
                <hr className='hrtag'/><br/>
                <div className="userid">&#128199;&nbsp;&nbsp;{userData._id}</div>
                <hr className='hrtag'/><br/>
                <div className="email"><i className="fas fa-solid fa-envelope"></i>&nbsp;&nbsp;&nbsp;{userData.email}</div>
                <hr className='hrtag'/><br/>
                <div className="address">&#128205;&nbsp;&nbsp;{userData.shop},{userData.lane},{userData.locality},{userData.state},{userData.pincode}</div>
                <hr className='hrtag'/><br/>
                <div className="email"><i className="fas fa-solid fa-phone"></i>&nbsp;&nbsp;&nbsp;{userData.phonenumber}</div>
                <hr className='hrtag'/><br/>
                <button className="editpro">Edit Profile</button>
            </div>
            </div>
        </section>
    )
}
