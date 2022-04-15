import React from 'react';

import TextInputField from "../../common/TextInputField";
import SelectInputField from "../../common/SelectInputField";
import Button from "../../common/Button";

import { SEVERITY_LEVEL } from "../../../constants/constants";
import TextAreaInputField from "../../common/TextAreaInputField";

import "./issueForm-styles.css";

const IssueForm = ({ issue, onChange, submit, cancel, editing, filter, selectProperty }) => {

    return (
        <div className="d-flex justify-content-center text-center">
            <form id="issueInputForm">
                <TextAreaInputField
                    label="issueDescInput"
                    name="description"
                    labelText="Describe the Issue"
                    value={issue.description}
                    onChange={onChange}
                />
                <SelectInputField
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
                <>
                    <ul className="list-group list-group-flush">
                        {!issue.assignedTo &&
                        (<li key="nores" className="list-group-item">no results</li>)}
                        {issue.assignedTo &&
                        filter().map(user => (
                            <li
                                key={user._id}
                                className="list-group-item list-group-item-secondary"
                                onClick={()=> selectProperty(user)}
                            >
                                {user.first_name} {user.last_name}
                            </li>)
                        )
                        }
                    </ul>
                </>
                <Button
                    cssId="submitBtn"
                    type="submit"
                    classes="btn btn-primary"
                    handleClick={e => submit(e)}
                    value={editing ? "Edit Issue" : "Add Issue"}
                />
                <Button
                    cssId="cancelBtn"
                    type="submit"
                    classes="btn btn-secondary"
                    handleClick={e => cancel(e)}
                    value="Cancel"
                />
            </form>
        </div>

    );
};

export default IssueForm;