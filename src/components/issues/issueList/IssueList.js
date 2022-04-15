import React from 'react';
import Button from "../../common/Button";

const IssueList = ({ issues, onEdit, onDelete, toggleStatus, loginStatus, loggedInUser }) => {

    return (
        <div>
            <h1> Issue List </h1>
            {
                !issues
                    ? null
                    :
                    <>
                        <table
                            className="table table-striped table-hover table-bordered"
                            style={{maxWidth: "1200px", margin: "0 15%"}}
                        >
                            <thead className="table-dark">
                            <tr>
                                <th />
                                <th>Status</th>
                                <th>Severity</th>
                                <th>Description</th>
                                <th>Created By</th>
                                <th>Assigned To</th>
                                <th />
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            {issues.map(issue => {
                                let disable = true;
                                if (loggedInUser.role === "admin") {
                                    disable = false;
                                } else if (loggedInUser._id === issue.createdBy_id) {
                                    disable = false;
                                }
                                return (
                                    <tr key={issue._id}>
                                        <td>
                                            {
                                                <Button
                                                    itemId={issue._id}
                                                    classes={issue.status === "Open"
                                                        ? "btn btn-outline-warning"
                                                        : "btn btn-outline-success"
                                                    }
                                                    handleClick={toggleStatus}
                                                    value={issue.status === "Open"
                                                        ? "Close Issue"
                                                        : "Open Issue"
                                                    }
                                                    disabled={disable}
                                                />
                                            }
                                        </td>
                                        <td>{issue.status}</td>
                                        <td>{issue.severity}</td>
                                        <td>{issue.description}</td>
                                        <td>{issue.createdBy}</td>
                                        <td>{issue.assignedTo}</td>
                                        <td>
                                            <Button
                                                itemId={issue._id}
                                                classes="btn btn-outline-info"
                                                handleClick={onEdit}
                                                value="Edit"
                                                disabled={disable}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                itemId={issue._id}
                                                classes="btn btn-outline-danger"
                                                handleClick={onDelete}
                                                value="Delete"
                                                disabled={disable}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </>
            }


        </div>
    );
};

export default IssueList;