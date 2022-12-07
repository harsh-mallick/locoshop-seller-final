import { React, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router'

const Logout = () => {
    const history = useNavigate()
    const {dispatch} = useContext(UserContext);
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({type: "USER", payload: false})
            window.localStorage.setItem("payload", "false")
            history('/')
            window.location.reload()
            if(res.status !== 200){
                const error = new Error(res.error)
                throw error
            }
        }).catch((err) => {
            console.log(err)
        })
    })

  return (
    <div>Logout</div>
  )
}

export default Logout