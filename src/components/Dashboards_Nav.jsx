import React from 'react'

import logo from "../assets/logos/tendr-logo-secondary.png";
import { useNavigate } from 'react-router-dom';

const Dashboards_Nav = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="top flex w-full justify-between px-3 py-2">
                <div className="logo">
                    <img
                        src={logo}
                        alt="tendr logo"
                        style={{ height: "50px" }}
                        className='transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer'
                        onClick={() => navigate("/")}
                    />
                </div>
            </div>
        </>
    )
}

export default Dashboards_Nav
