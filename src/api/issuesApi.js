import { STATUS } from "../constants/constants";

const url = "http://localhost:5000/issues"

export const getAllIssues = () => {
    return fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data=> data);

}

export const getIssueByID = (id) => {
   return fetch(`${url}/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data=> data);
}

export const saveNewIssue = (issue) => {
    const {_id, createdBy, assignedTo, ...tempIssue} = issue;

    const newIssue = {
        ...tempIssue,
        createdAt: Date.now(),
        status: STATUS.OPEN
    }

    fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(newIssue),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json()
        )

}

export const updateIssue = (issue) => {
   const { _id, createdBy, assignedTo, ...updatedIssue} = issue;

    fetch(`${url}/${issue._id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(updatedIssue),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
}

export const deleteIssue = (id) => {
    fetch(`${url}/${id}`, {
        method: "DELETE",
        mode: "cors",
    })
        .then(res => {
            console.log(res)
            res.json()
        })
}

// export const toggleIssueStatus = (id) => {
//
//     fetch(`${url}/${id}/status`, {
//         method: "PATCH",
//         body: id
//     })
//
//     const issues = getAllIssues();
//
//     const updatedIssues = issues.filter(item => {
//         if (item._id === id) {
//             if (item.status === STATUS.OPEN) {
//                 item.status = STATUS.CLOSED
//             } else {
//                 item.status = STATUS.OPEN
//             }
//             return item
//         } else {
//             return item
//         }
//     })
//
//     localStorage.setItem(storageKey, JSON.stringify(updatedIssues));
//
//     return updatedIssues
// }

