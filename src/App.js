import React, {useState} from "react";

import './App.css';

import Header from "./components/header/Header";
import Issues from "./components/issues/Issues";
import Users from "./components/users/Users";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
    const [ loginStatus, setLoginStatus ] = useState(false);

    const toggleLogin = () => {
        setLoginStatus(!loginStatus);
    }

  return (
    <div className="App">
        <Header loginStatus={loginStatus} handleClick={toggleLogin}/>
        <Navbar />
        <Routes>
            <Route path="/" exact element={<Home loginStatus={loginStatus}/>} />
            <Route path="/issues" element={<Issues loginStatus={loginStatus}/>}/>
            <Route path="/users" element={<Users loginStatus={loginStatus}/>} />
        </Routes>


    </div>
  );
}

export default App;
