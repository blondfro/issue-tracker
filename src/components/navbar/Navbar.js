import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <NavLink to="/issues" className="btn btn-light">Issues</NavLink>
            <NavLink to="/users" className="btn btn-light">Users</NavLink>
        </div>
    );
};

export default Navbar;