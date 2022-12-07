import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css'
import { useCookies } from 'react-cookie';

export default function Contactus() {
    const history = useNavigate()
    const [Data, setData] = useState({});
    const [cookies, setCookie] = useCookies(['name']);

    const callAboutPage = async () => {
        try {
            const res = await fetch("/getallitem", {
                method: "GET",
                mode: "no-cors",
                headers: {
                    Accept: "application/json",
                    "Content-": "application/json",
                },
                credentials: "include"
            })

            const data = await res.json();
            // console.log(data)
            setData(data)

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (error) {
            history('/school-login')
            console.log(error)
        }
    }

    console.log(Object.keys(Data).length)
    useEffect(() => {
        callAboutPage();
    });
    Data.length = Object.keys(Data).length;
    console.log(Array.prototype.slice.call(Data, 4));

    var sliced = [];
    for (var i = 0; i < 4; i++)
        sliced[i] = Data[i];
    console.log(sliced);

    return (
        <section>
            <div className="sections1" >
                <h3 className="h3" style={{ alignSelf: "center", marginLeft: "650px" }}>All Products</h3><br /><br />
                <div className="grid grid-4-col" style={{ marginLeft: "50px" }}>
                    {Array.isArray(Data) && Data.map(datas => {
                        const handleOutput = () => {
                            const id = datas._id;
                            setCookie('itemid', id, {path: "/"}, {expires: new Date(Date.now() + 25892000000)}, {httpOnly: true});
                            console.log(cookies)
                            history(`/adding-request/${id}`);
                        }
                        return (
                                
                            <div key={datas._id}  >
                                <div className="card" style={{ width: "18rem"}}>
                                    <img src={datas.pimage} className="card-img-top" alt="..." />
                                    <div className="card-body" onClick = {handleOutput} style = {{cursor: "pointer"}}>
                                        <h5 className="card-title"> Name: {datas.pname}</h5>
                                        <p className="card-text">Model: {datas.pmodel}</p>
                                        <p className="card-text">Size: {datas.psize}</p>
                                        <p className="card-text">Price: {datas.pprice}</p><br/><br/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}