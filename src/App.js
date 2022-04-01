import React from "react";

import './App.css';

import Header from "./components/header/Header";
import Issues from "./components/issues/Issues";
import Users from "./components/users/Users";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
        <Header />
        <Navbar />
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/issues" element={<Issues />}/>
            <Route path="/users" element={<Users />} />
        </Routes>


    </div>
  );
}

export default App;
