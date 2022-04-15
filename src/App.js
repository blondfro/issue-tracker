import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';

import Header from "./components/header/Header";
import Issues from "./components/issues/Issues";
import Users from "./components/users/Users";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";

import {getAllUsers} from "./api/usersApi";

function App() {
    const [ loginStatus, setLoginStatus ] = useState(false);
    const [ showLogin, setShowLogin ] = useState(false);
    const [ loggedInUser, setLoggedInUser ] = useState({})

    const toggleLogin = () => {
        if (loginStatus) {
            setLoginStatus(false);
            setLoggedInUser({});
            console.log("user logged out")
        } else {
           setShowLogin(true);
        }

    }

    const handleLogin = async (user) => {
        const users = await getAllUsers();
        const tmpUser = users.find(item =>
            (
                item.user_name.toLowerCase() === user.username.toLowerCase() &&
                item.password.toLowerCase() === user.password.toLowerCase()
            ))

        if (tmpUser) {
            console.log("user logged in");
            setShowLogin(false);
            setLoginStatus(true);
            setLoggedInUser(tmpUser);

        } else {
            console.log("user not logged in");
            setLoginStatus(false);
            setLoggedInUser({})
        }



    }

    const handleCancel = () => {
        setShowLogin(false);
        setLoginStatus(false);
    }

  return (
    <div className="App">
        <Header loginStatus={loginStatus} handleClick={toggleLogin} loggedInUser={loggedInUser}/>
        <Navbar />
        <Login showLogin={showLogin} handleLogin={handleLogin} cancel={handleCancel}/>
        <Routes>
            <Route path="/" exact element={<Home loginStatus={loginStatus}/>} />
            <Route path="/issues" element={<Issues loginStatus={loginStatus}/>}/>
            <Route path="/users" element={<Users loginStatus={loginStatus} role={loggedInUser.role}/>} />
        </Routes>


    </div>
  );
}

export default App;
