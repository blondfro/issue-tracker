import React from 'react';
import IssueForm from "./issueForm/IssueForm";
import IssueList from "./issueList/IssueList";

const Issues = () => {
    return (
        <>
            <IssueForm />
            <IssueList />
        </>
    );
};

export default Issues;