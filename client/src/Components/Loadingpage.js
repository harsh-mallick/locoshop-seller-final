import React from 'react'
import logo from '../Images/Icon-loading.gif'
import '../css/Loading.css'


const Loadingpage = () => {
  return (
    <main>
        <img src={logo} alt="" className='loading'/>
    </main>
  )
}

export default Loadingpage