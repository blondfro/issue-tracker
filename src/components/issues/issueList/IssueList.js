import React from 'react';
import Button from "../../common/Button";

const IssueList = ({ issues, onEdit, onDelete, toggleStatus, loginStatus }) => {

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
                                return (
                                    <tr key={issue._id}>
                                        <td>
                                            {
                                                issue.status === "Open"
                                                    ? <Button
                                                        itemId={issue._id}
                                                        classes="btn btn-outline-warning"
                                                        handleClick={toggleStatus}
                                                        value="Close Issue"
                                                        disabled={!loginStatus}
                                                    />
                                                    : <Button
                                                        itemId={issue._id}
                                                        classes="btn btn-outline-success"
                                                        handleClick={toggleStatus}
                                                        value="Open Issue"
                                                        disabled={!loginStatus}
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
                                                disabled={!loginStatus}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                itemId={issue._id}
                                                classes="btn btn-outline-danger"
                                                handleClick={onDelete}
                                                value="Delete"
                                                disabled={!loginStatus}
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