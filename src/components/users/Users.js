import React, {useEffect, useState} from 'react';
import UserForm from "./userForm/UserForm";
import UserList from "./userList/UserList";

import {getAllUsers, getUserByID, updateUser, deleteUser, saveNewUser} from "../../api/usersApi";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState({
        _id: 0,
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        department: "Research and Development",
        avatar: "",
        createdAt: ""
    })
    const [isEditing, setIsEditing] = useState(false);
    const [update, setUpdate] = useState(true);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (users.find(item => item._id === user._id)) {

            let updatedUsers = await updateUser(user);
            setUsers(updatedUsers)

        } else {
            let updatedUsers = await saveNewUser(user);
            setUsers(updatedUsers);
        }

        setIsEditing(false);
        setUpdate(true);

        setUser({
            _id: 0,
            first_name: "",
            last_name: "",
            user_name: "",
            email: "",
            department: "Research and Development",
            avatar: ""
        })

        setUpdate(true);
    }

    const handleEdit = async (id) => {
        setIsEditing(true);

        const editUser = await getUserByID(id);
        setUser(editUser);
        setUpdate(true);
    }

    const handleDelete = async (id) => {
        const updatedUsers = await deleteUser(id)

        setUsers(updatedUsers);
        setUpdate(true);
    }

    return (
        <>
            <UserForm
                user={user}
                onChange={handleChange}
                submit={handleSubmit}
                editing={isEditing}
            />
            <UserList
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />


        </>
    );
};

export default Users;