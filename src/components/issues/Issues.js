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

        setIssue({
            _id: 0,
            description: "",
            severity: "",
            assignedTo: "",
            createdAt: ""
        })
    }

    const handleEdit = (id) => {
        console.log(`Edit id: ${id} was clicked.`);
    }

    const handleDelete = (id) => {
        console.log(`Delete id: ${id} was clicked.`);
    }

    const toggleStatus = (id) => {
        console.log(`Toggle id: ${id} was clicked.`);
    }

    return (
        <>
            <IssueForm issue={issue} onChange={handleChange} submit={handleSubmit}/>
            <IssueList
                issues={issues}
                onEdit={handleEdit}
                onDelete={handleDelete}
                toggleStatus={toggleStatus}/>
        </>
    );
};

export default Issues;