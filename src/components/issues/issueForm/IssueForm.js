import React, {useState} from 'react';
import { v4 as uuidv4 } from "uuid";

import TextInputField from "../../common/TextInputField";
import CheckboxInputField from "../../common/CheckboxInputField";
import Button from "../../common/Button";

const IssueForm = () => {
    const [ issue, setIssue ] = useState({
        _id: 0,
        description: "",
        severity: "",
        assignedTo: "",
        createdAt: "",
        status: ""
    })

    const severityOptions = ["Low", "Medium", "High"]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIssue((prevIssue) => (
            {
                ...prevIssue,
                [name]: value
            }
        ))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setIssue(prevIssue => ({
            ...prevIssue,
            _id: uuidv4(),
            createdAt: Date.now(),
            status: "Open"
        }));

        setIssue({
            _id: 0,
            description: "",
            severity: "",
            assignedTo: "",
            createdAt: ""
        })
    }

    return (
        <form id="issueInputForm">
            <TextInputField
                label="issueDescInput"
                name="description"
                labelText="Describe the Issue"
                value={issue.description}
                onChange={handleChange}
            />
            <CheckboxInputField
                label="issueSeverityInput"
                name="severity"
                labelText="Severity Level"
                options={severityOptions}
                value={issue.severity}
                onChange={handleChange}
            />
            <TextInputField
                label="issueAssignedToInput"
                name="assignedTo"
                labelText="Issue assigned to"
                value={issue.assignedTo}
                onChange={handleChange}
            />
            <Button
                id="submitBtn"
                type="submit"
                classes="btn btn-primary"
                handleClick={handleSubmit}
                value="Add Issue"
            />
        </form>
    );
};

export default IssueForm;