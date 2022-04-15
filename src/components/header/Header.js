import React from 'react';
import Button from "../common/Button";

const Header = ({ loginStatus, handleClick, loggedInUser }) => {
    return (
        <div>
            <h1>Admin Portal</h1>
            {
                loggedInUser && loginStatus
                    ? <h3>Welcome {loggedInUser.first_name}</h3>
                    : null
            }
            <Button
                itemId="login-btn"
                classes={
                    loginStatus
                        ? "btn btn-outline-success"
                        : "btn btn-outline-primary"
                }
                handleClick={handleClick}
                value={loginStatus ? "Log-out" : "Login"}
            />
        </div>
    );
};

export default Header;