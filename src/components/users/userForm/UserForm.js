import React from 'react';

import TextInputField from "../../common/TextInputField";
import Button from "../../common/Button";

import { DEPARTMENTS } from "../../../constants/constants";
import SelectInputField from "../../common/SelectInputField";

const UserForm = ({ user, onChange, submit, editing}) => {
    return (
        <form id="userInputForm">
            <TextInputField
                label="userFirstName"
                name="first_name"
                labelText="First Name"
                value={user.first_name}
                onChange={onChange}
            />
            <TextInputField
                label="userLastName"
                name="last_name"
                labelText="Last Name"
                value={user.last_name}
                onChange={onChange}
            />
            <SelectInputField
                label="issueSeverityInput"
                name="department"
                labelText="Department"
                options={DEPARTMENTS}
                value={user.department}
                onChange={onChange}
            />
            <Button
                cssId="submitBtn"
                type="submit"
                classes="btn btn-primary"
                handleClick={e => submit(e)}
                value={editing ? "Edit User" : "Add User"}
            />
        </form>
    );
};

export default UserForm;