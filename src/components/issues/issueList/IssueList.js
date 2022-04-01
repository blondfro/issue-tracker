import React from 'react';
import Button from "../../common/Button";

const IssueList = ({ issues, onEdit, onDelete, toggleStatus }) => {

    return (
        <div>
            <h1> Issue List </h1>
            {issues.map(issue => {
               return (
                   <div key={issue._id}>
                       <div>
                           {
                               issue.status === "Open"
                                   ? <Button
                                       itemId={issue._id}
                                       classes="btn btn-warning"
                                       handleClick={toggleStatus}
                                       value="Close Issue"
                                   />
                                   : <Button
                                       itemId={issue._id}
                                       classes="btn btn-success"
                                       handleClick={toggleStatus}
                                       value="Open Issue"
                                   />
                           }
                       </div>
                       <h6> Issue ID: {issue._id} </h6>
                       <p><span>{issue.status}</span></p>
                       <h3>{issue.description}</h3>
                       <p><span>{issue.severity}</span></p>
                       <p><span>{issue.assignedTo}</span></p>
                       <Button
                           itemId={issue._id}
                           classes="btn btn-info"
                           handleClick={onEdit}
                           value="Edit"
                       />
                       <Button
                           itemId={issue._id}
                           classes="btn btn-danger"
                           handleClick={onDelete}
                           value="Delete"
                       />
                   </div>
               )
            })}
        </div>
    );
};

export default IssueList;