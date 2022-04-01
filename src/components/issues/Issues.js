import React, {useState} from 'react';
import IssueForm from "./issueForm/IssueForm";
import IssueList from "./issueList/IssueList";
import {v4 as uuidv4} from "uuid";

import { STATUS } from "../../constants/constants";

const Issues = () => {
    const [ issues, setIssues ] = useState([]);
    const [ issue, setIssue ] = useState({
        _id: 0,
        description: "",
        severity: "",
        assignedTo: "",
        createdAt: "",
        status: ""
    })
    const [ isEditing, setIsEditing ] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIssue((prevIssue) => (
            {
                ...prevIssue,
                [name]: value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newIssue = {
            ...issue,
            _id: uuidv4(),
            createdAt: Date.now(),
            status: STATUS.OPEN
        }

        if (issues.find(item => item._id === issue._id)) {
            let newIssues = issues.map(item => {
                if (item._id === issue._id) {
                    item = { ...issue };
                    return item
                } else return  item
            });
            setIssues([...newIssues]);
        } else {
            setIssues([ ...issues, newIssue])
        }

        setIsEditing(false);
        setIssue({
            _id: 0,
            description: "",
            severity: "",
            assignedTo: "",
            createdAt: ""
        })
    }

    const handleEdit = (id) => {
        setIsEditing(true);

        const editIssue = issues.find(item => item._id === id);
        setIssue(editIssue);
    }

    const handleDelete = (id) => {
        const updatedIssues = issues.filter(item => item._id !== id);
        setIssues(updatedIssues);
    }

    const toggleStatus = (id) => {

        const updatedIssues = issues.filter(item => {
            if (item._id === id) {
                if (item.status === STATUS.OPEN) {
                    item.status = STATUS.CLOSED
                } else {
                    item.status = STATUS.OPEN
                }
                return item
            } else {
                return item
            }
        })

        setIssues(updatedIssues);
    }

    return (
        <>
            <IssueForm
                issue={issue}
                onChange={handleChange}
                submit={handleSubmit}
                editing={isEditing}
            />
            <IssueList
                issues={issues}
                onEdit={handleEdit}
                onDelete={handleDelete}
                toggleStatus={toggleStatus}/>
        </>
    );
};

export default Issues;