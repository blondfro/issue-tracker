import React, {useState} from 'react';
import IssueForm from "./issueForm/IssueForm";
import IssueList from "./issueList/IssueList";
import {v4 as uuidv4} from "uuid";

import { STATUS } from "../../constants/constants";

const usersList = [
    {
        _id: "c42c8da6-56e5-4142-b02d-cb8f0dcfdddf",
        first_name: "Erin",
        last_name: "Stanmer",
        user_name: "estanmer0",
        email: "estanmer0@democo.com",
        department: "Research and Development",
        avatar: "https://robohash.org/rerumrepellatqui.png?size=50x50&set=set1",
        createdAt: "1632369746000"
    },
    {
        _id: "7788cb29-33f4-4b5a-be2d-b748fb90e312",
        first_name: "Micheil",
        last_name: "Donhardt",
        user_name: "mdonhardt1",
        email: "mdonhardt1@democo.com",
        department: "Training",
        avatar: "https://robohash.org/totamsapienteautem.png?size=50x50&set=set1",
        createdAt: "1641215813000"
    },
    {
        _id: "b9fbd040-d06c-4a57-99c1-f80088b2435b",
        first_name: "Frants",
        last_name: "Drinan",
        user_name: "fdrinan2",
        email: "fdrinan2@democo.com",
        department: "Human Resources",
        avatar: "https://robohash.org/architectoaliquidquae.png?size=50x50&set=set1",
        createdAt: "1621211341000"
    },
    {
        _id: "d0b1919e-839e-4c0d-ab32-7ac45ea46a64",
        first_name: "Catherina",
        last_name: "Houlson",
        user_name: "choulson3",
        email: "choulson3@democo.com",
        department: "Legal",
        avatar: "https://robohash.org/minimaerrorfugiat.png?size=50x50&set=set1",
        createdAt: "1641968589000"
    },
    {
        _id: "957f0717-58a5-414c-9909-a2e95557694a",
        first_name: "Halimeda",
        last_name: "Amorts",
        user_name: "hamorts4",
        email: "hamorts4@democo.com",
        department: "Business Development",
        avatar: "https://robohash.org/quidemrecusandaeplaceat.png?size=50x50&set=set1",
        createdAt: "1639627397000"
    }
];

const Issues = () => {
    const [ issues, setIssues ] = useState([]);
    const [ issue, setIssue ] = useState({
        _id: 0,
        description: "",
        severity: "",
        assignedTo: "",
        assignedTo_Id: "",
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

    const filterList = () => {
        let lowercaseSearch = issue.assignedTo.toLowerCase();

        let filteredList = issue.assignedTo
            ? usersList.filter(item =>
                item.first_name.toLowerCase().includes(lowercaseSearch)
                || item.last_name.toLowerCase().includes(lowercaseSearch)
            )
            : usersList

        // setFilteredUsers(filteredList)
        return filteredList;
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
            assignedTo_Id: "",
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

    const selectItemProperty = (user) => {
        setIssue(prevIssue => ({
            ...prevIssue,
            assignedTo: `${user.first_name} ${user.last_name}`,
            assignedTo_id: user._id
        }))
    }

    return (
        <>
            <IssueForm
                issue={issue}
                onChange={handleChange}
                submit={handleSubmit}
                editing={isEditing}
                filter={filterList}
                selectProperty={selectItemProperty}
            />
            <IssueList
                issues={issues}
                onEdit={handleEdit}
                onDelete={handleDelete}
                toggleStatus={toggleStatus}
            />
        </>
    );
};

export default Issues;