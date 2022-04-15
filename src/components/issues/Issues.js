import React, {useEffect, useState} from 'react';
import IssueForm from "./issueForm/IssueForm";
import IssueList from "./issueList/IssueList";

import {
    deleteIssue,
    getAllIssues,
    saveNewIssue,
    updateIssue
} from "../../api/issuesApi";
import {getAllUsers} from "../../api/usersApi";
import {STATUS} from "../../constants/constants";
import Button from "../common/Button";


const Issues = ({ loginStatus, loggedInUser }) => {
    const [ issues, setIssues ] = useState([]);
    const [ issue, setIssue ] = useState({
        _id: 0,
        description: "",
        severity: "Low",
        createdBy: "",
        createdBy_id: "",
        assignedTo: "",
        assignedTo_id: "",
        createdAt: "",
        status: ""
    })
    const [ isEditing, setIsEditing ] = useState(false);
    const [ update, setUpdate ] = useState(true);
    const [ users, setUsers ] = useState([])
    const [ showForm, setShowForm ] = useState(false);

    const getIssues = async () => {
        const results = await getAllIssues();
        const usersList = await getAllUsers();

        const updatedIssues = results.map(item => {
            let createdBy = usersList.find(user => user._id === item.createdBy_id);
            let assignedTo = usersList.find(user => user._id === item.assignedTo_id);
            item.createdBy = `${createdBy.first_name} ${createdBy.last_name}`;
            item.assignedTo = `${assignedTo.first_name} ${assignedTo.last_name}`;
            return item
        });

        setUsers(usersList);
        setIssues(updatedIssues);
    }

    useEffect(()=> {
        if (update) {
            getIssues()
        }

        setUpdate(false);
    }, [update])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setIssue((prevIssue) => (
            {
                ...prevIssue,
                [name]: value
            }
        ))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (issues.find(item => item._id === issue._id)) {
            await updateIssue(issue);

            setIsEditing(false);
        } else {
            let updatedIssue = {...issue, createdBy_id: loggedInUser._id};
            await saveNewIssue(updatedIssue)
        }

        resetIssue();

        setShowForm(false);
        setUpdate(true);
    }

    const handleCreate = (event) => {
        event.preventDefault();
        setShowForm(true)
    }

    const handleEdit = async (id) => {
        setIsEditing(true);

        const editIssue = await issues.find(item => item._id === id)
        setIssue(editIssue);

        setUpdate(true);
    }

    const handleDelete = async (id) => {
        await deleteIssue(id);
        setUpdate(true);
    }

    const filterList = () => {
        let lowercaseSearch = issue.assignedTo.toLowerCase();

        return issue.assignedTo
            ? users.filter(item =>
                item.first_name.toLowerCase().includes(lowercaseSearch)
                || item.last_name.toLowerCase().includes(lowercaseSearch)
            )
            : users
    }

    const toggleStatus = async (id) => {
        const updatedIssue = issues.find(item => item._id === id);
        if (updatedIssue.status === STATUS.OPEN) {
            updatedIssue.status = STATUS.CLOSED
        } else {
            updatedIssue.status = STATUS.OPEN
        }

        await updateIssue(updatedIssue);

        setUpdate(true);
    }

    const selectItemProperty = (user) => {
        setIssue(prevIssue => ({
            ...prevIssue,
            assignedTo: `${user.first_name} ${user.last_name}`,
            assignedTo_id: user._id
        }))
    }

    const resetIssue = () => {
        setIssue({
            _id: 0,
            description: "",
            severity: "Low",
            createdBy: "",
            createdBy_id: "",
            assignedTo: "",
            assignedTo_id: "",
            createdAt: ""
        })
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setShowForm(false);
        resetIssue();
    }

    return (
        <>
            {
                loginStatus
                    ?
                    <Button
                        cssId="create-user-btn"
                        classes="btn btn-primary"
                        handleClick={handleCreate}
                        value="Create User"
                    />
                    : null
            }
            {
                showForm
                    ?
                    <IssueForm
                        issue={issue}
                        onChange={handleChange}
                        submit={handleSubmit}
                        cancel={handleCancel}
                        editing={isEditing}
                        filter={filterList}
                        selectProperty={selectItemProperty}
                    />
                    : null
            }

            <IssueList
                issues={issues}
                onEdit={handleEdit}
                onDelete={handleDelete}
                toggleStatus={toggleStatus}
                loginStatus={loginStatus}
                loggedInUser={loggedInUser}
            />
        </>
    );
};

export default Issues;