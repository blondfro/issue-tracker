import React from 'react';
import Button from "../../common/Button";

const UserList = ({ users, onEdit, onDelete}) => {
    return (
        <div>
            <h1> Users List </h1>
            {
                !users
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
                                <th>Name</th>
                                <th>User Name</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map( user => {
                                    return (
                                        <tr key={user._id}>
                                            <td>
                                                <Button
                                                    itemId={user._id}
                                                    classes="btn btn-outline-primary"
                                                    handleClick={onEdit}
                                                    value="Edit"
                                                />
                                            </td>
                                            <td>
                                                <img src={user.avatar} alt=""/>
                                                {user.first_name} {user.last_name}
                                            </td>
                                            <td>{user.user_name}</td>
                                            <td>{user.department}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Button
                                                    itemId={user._id}
                                                    classes="btn btn-outline-danger"
                                                    handleClick={onDelete}
                                                    value="Delete"
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </>
            }
        </div>
    );
};

export default UserList;