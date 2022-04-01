import React from 'react';

import TextInputField from "../../common/TextInputField";
import CheckboxInputField from "../../common/CheckboxInputField";
import Button from "../../common/Button";

import { SEVERITY_LEVEL } from "../../../constants/constants";

const IssueForm = ({ issue, onChange, submit, editing }) => {

    return (
        <form id="issueInputForm">
            <TextInputField
                label="issueDescInput"
                name="description"
                labelText="Describe the Issue"
                value={issue.description}
                onChange={onChange}
            />
            <CheckboxInputField
                label="issueSeverityInput"
                name="severity"
                labelText="Severity Level"
                options={SEVERITY_LEVEL}
                value={issue.severity}
                onChange={onChange}
            />
            <TextInputField
                label="issueAssignedToInput"
                name="assignedTo"
                labelText="Issue assigned to"
                value={issue.assignedTo}
                onChange={onChange}
            />
            <Button
                cssId="submitBtn"
                type="submit"
                classes="btn btn-primary"
                handleClick={e => submit(e)}
                value={editing ? "Edit Issue" : "Add Issue"}
            />
        </form>
    );
};

export default IssueForm;