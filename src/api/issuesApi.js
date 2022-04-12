import {v4 as uuidv4} from "uuid";
import { STATUS } from "../constants/constants";

const storageKey = "issues";

const url = "http://localhost:5000/issues"

export const getAllIssues = () => {
    const issues = fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data=> console.log(data));

    if (JSON.parse(localStorage.getItem(storageKey))) {
        return JSON.parse(localStorage.getItem(storageKey));
    } else return []

}

export const getIssueByID = (id) => {
    const issues = getAllIssues();

    return  issues.find(item => item._id === id);
}

export const saveNewIssue = (issue) => {
    const updatedIssues = getAllIssues();

    const newIssue = {
        ...issue,
        _id: uuidv4(),
        createdBy: "James",
        createdAt: Date.now(),
        status: STATUS.OPEN
    }

    updatedIssues.push(newIssue);

    localStorage.setItem(storageKey, JSON.stringify(updatedIssues));

    return updatedIssues
}

export const updateIssue = (issue) => {
    const issues = getAllIssues();

    let updatedIssues = issues.map(item =>
        item._id === issue._id
            ? issue
            : item
    )

    localStorage.setItem(storageKey, JSON.stringify(updatedIssues));

    return updatedIssues
}

export const deleteIssue = (id) => {
    const issues = getAllIssues();

    let updatedIssues = issues.filter(item =>
        item._id !== id
    )

    localStorage.setItem(storageKey, JSON.stringify(updatedIssues));
    return updatedIssues

}

export const toggleIssueStatus = (id) => {
    const issues = getAllIssues();

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

    localStorage.setItem(storageKey, JSON.stringify(updatedIssues));

    return updatedIssues
}

