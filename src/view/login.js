import { array } from "prop-types";
import React, { useState, useEffect } from "react";
import {
    Redirect
} from "react-router-dom";
import { Icon } from '../component/icon';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {

    const [userData, setUserData] = useState([])

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    useEffect(() => {
        fetch("userData.json")
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error(error))
    }, [])

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const isRegisteredUser = userData.map((user) => (
            user.username === loginData.username && user.password === loginData.password
        ))
        
        if (isRegisteredUser) {
            localStorage.setItem("isLoggedIn", JSON.stringify(true))
            localStorage.setItem("user", JSON.stringify(loginData))
            setIsLoggedIn(true)
        } else { 
            alert("Kullanıcı bulunumadı.")

        } 
    }

    const handleChangeInput = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-wrapper">
            <form className="login-form" action="" onSubmit={handleLoginSubmit}>
                <div className="login-icon-wrapper">
                    <Icon size={50} iconName="twitter" color="#1DA1F2" />
                </div>
                <div>
                    <input className="user-name-input"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={loginData.username}
                        onChange={handleChangeInput} />

                </div>
                <div>
                    <input className="password-input"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={loginData.password}
                        onChange={handleChangeInput} />

                </div>
                <button className="login-submit-button" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;