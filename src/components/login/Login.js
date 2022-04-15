import React, {useState} from 'react';

import TextInputField from "../common/TextInputField";
import Button from "../common/Button";

import "./loginStyles.css";

const Login = ({ showLogin, handleLogin, cancel }) => {
    const [ user, setUser ] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUser((prevIssue) => (
            {
                ...prevIssue,
                [name]: value
            }
        ))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(user)

        setUser({
            username: "",
            password: ""
        })
    }

    const handleCancel = (event) => {
        event.preventDefault();
        cancel();
    }

    return (
        <>
            {
                !showLogin
                    ? null
                    :
                    <div className="login-modal">
                        <div className="d-flex justify-content-center text-center login-bkg">
                            <div>
                                <div>
                                    <h4>Login</h4>
                                </div>

                                <form id="login-form">
                                    <TextInputField
                                        label="username_input"
                                        name="username"
                                        labelText="Username"
                                        value={user.username}
                                        onChange={handleChange}
                                    />
                                    <TextInputField
                                        label="user_password_input"
                                        name="password"
                                        labelText="Password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        cssId="submitBtn"
                                        type="submit"
                                        classes="btn btn-primary"
                                        handleClick={e => handleSubmit(e)}
                                        value="Login"
                                    />
                                    <Button
                                        cssId="cancelBtn"
                                        type="submit"
                                        classes="btn btn-secondary"
                                        handleClick={e => handleCancel(e)}
                                        value="Cancel"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </>

    );
};

export default Login;