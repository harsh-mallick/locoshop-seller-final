import React, {useContext } from 'react'
import '../css/Navbar.css'
import navlogo from '../Images/LocoShop.png'
import { Link } from "react-router-dom";
import { UserContext } from '../App';

const Navbar = () => {
    const { state } = useContext(UserContext)


    const RenderMenu = () => {
        console.log(state)
        if (window.localStorage.getItem("payload") === "true") {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" to="/seller-profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" to="/adding-request">Add your items</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" to="/all-item">See all items</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" to="/logout">Logout</Link>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" to="/seller-register">Seller Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active font-bold text-lg ml-4" to="/seller-login">Seller Signin</Link>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <img src={navlogo} alt="Addmiease Logo" className='ml-image' />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <RenderMenu/>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar