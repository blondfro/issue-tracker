import React, {useEffect, useState} from 'react';
import UserForm from "./userForm/UserForm";
import UserList from "./userList/UserList";

import {
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
    saveNewUser
} from "../../api/usersApi";
import Button from "../common/Button";

const Users = ({ loginStatus, role }) => {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState({
        _id: 0,
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        department: "Research and Development",
        role: "",
        avatar: "",
        createdAt: ""
    })
    const [isEditing, setIsEditing] = useState(false);
    const [update, setUpdate] = useState(true);
    const [ showForm, setShowForm ] = useState(false);
    const [loading, setLoading] = useState(true)

    const getUsers = async () => {
        const results = await getAllUsers();

        setUsers(results);

    }

    useEffect(() => {
        if (update) {
            getUsers();
        }

        setUpdate(false);

    }, [update])

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser((prevUser) => (
            {
                ...prevUser,
                [name]: value
            }
        ))
    }

    const resetUser = () => {
        setUser({
            _id: 0,
            first_name: "",
            last_name: "",
            user_name: "",
            email: "",
            department: "Research and Development",
            role: "",
            avatar: "",
            createdAt: ""
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (users.find(item => item._id === user._id)) {
            await updateUser(user);
            setIsEditing(false);
        } else {
            await saveNewUser(user);
        }

        resetUser();

        setUpdate(true);
    }

    const handleEdit = async (id) => {
        setIsEditing(true);
        setShowForm(true);

        const editUser = await getUserByID(id);
        setUser(editUser);
        setUpdate(true);
    }

    const handleDelete = async (id) => {
        await deleteUser(id)

        setUpdate(true);
    }

    const handleCreate = (event) => {
        event.preventDefault();
        setShowForm(true)
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setShowForm(false);
        resetUser();
    }

    return (
        <>
            {
                loginStatus && role === "admin"
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
                    <UserForm
                        user={user}
                        onChange={handleChange}
                        submit={handleSubmit}
                        cancel={handleCancel}
                        editing={isEditing}
                    />
                    : null
            }
            <UserList
                users={users}
                role={role}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />


        </>
    );
};

export default Users;