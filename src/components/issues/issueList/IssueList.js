import React from 'react';
import Button from "../../common/Button";

const IssueList = ({ issues, handleEdit, handleDelete, toggleStatus }) => {


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
                                       id={issue._id}
                                       classes="btn btn-warning"
                                       onClick={toggleStatus}
                                       value="Close"
                                   />
                                   : <Button
                                       id={issue._id}
                                       classes="btn btn-success"
                                       onClick={toggleStatus}
                                       value="Open"
                                   />
                           }
                       </div>
                       <h6> Issue ID: {issue._id} </h6>
                       <p><span>{issue.status}</span></p>
                       <h3>{issue.description}</h3>
                       <p><span>{issue.severity}</span></p>
                       <p><span>{issue.assignedTo}</span></p>
                       <Button
                           id={issue._id}
                           classes="btn btn-info"
                           onClick={handleEdit}
                           value="Edit"
                       />
                       <Button
                           id={issue._id}
                           classes="btn btn-danger"
                           onClick={handleDelete}
                           value="Edit"
                       />
                   </div>
               )
            })}
        </div>
    );
};

export default IssueList;