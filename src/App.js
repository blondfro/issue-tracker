import React, {useState} from "react";

import './App.css';

import Header from "./components/header/Header";
import Issues from "./components/issues/Issues";
import Users from "./components/users/Users";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import {getAllUsers} from "./api/usersApi";

function App() {
    const [ loginStatus, setLoginStatus ] = useState(false);
    const [ showLogin, setShowLogin ] = useState(true)
    const [ loggedInUser, setLoggedInUser ] = useState({
        name: "",
        role: "",
    })

    const toggleLogin = () => {
        if (loginStatus) {
            setLoginStatus(false);
            console.log("user logged out")
        } else {
           setShowLogin(true);
        }

    }

    const handleLogin = async (user) => {
        const users = await getAllUsers();

        if (users.find(item =>
            (item.user_name.toLowerCase() === user.name.toLowerCase() &&
            item.password.toLowerCase() === user.password.toLowerCase())
        )) {
            console.log("user logged in");
            setShowLogin(false);
            setLoginStatus(true);
        } else {
            console.log("user not logged in");
            setLoginStatus(false);
        }

    }

    const handleCancel = () => {
        setShowLogin(false);
        setLoginStatus(false);
    }

  return (
    <div className="App">
        <Header loginStatus={loginStatus} handleClick={toggleLogin}/>
        <Navbar />
        <Login showLogin={showLogin} handleLogin={handleLogin} cancel={handleCancel}/>
        <Routes>
            <Route path="/" exact element={<Home loginStatus={loginStatus}/>} />
            <Route path="/issues" element={<Issues loginStatus={loginStatus}/>}/>
            <Route path="/users" element={<Users loginStatus={loginStatus}/>} />
        </Routes>


    </div>
  );
}

export default App;
