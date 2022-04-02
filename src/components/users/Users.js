import React, {useEffect, useState} from 'react';
import UserForm from "./userForm/UserForm";
import UserList from "./userList/UserList";
import {v4 as uuidv4} from "uuid";

import {AVATAR_URL, EMAIL_ADDR} from "../../constants/constants";


const Users = () => {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState({
        _id: 0,
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        department: "",
        avatar: "",
        createdAt: ""
    })
    const [isEditing, setIsEditing] = useState(false);
    const [update, setUpdate] = useState(true);
    const [loading, setLoading] = useState(true)

    const getUsers = async () => {
        if (users) {
            return users
        } else {
            await fetch("data/MOCK_USER_DATA.json")
                .then(res => res.json())
                .then(data => {
                    setUsers(data);
                    setLoading(false);
                });
        }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const userName = `${user.first_name.charAt(0)}${user.last_name}`

        const newUser = {
            ...user,
            _id: uuidv4(),
            user_name: userName,
            email: `${userName}${EMAIL_ADDR.EMAIL}`,
            avatar: `${AVATAR_URL.START}${user.user_name}${AVATAR_URL.END}`,
            createdAt: Date.now(),
        }

        if (users.find(item => item._id === user._id)) {
            let updatedUser = {
                ...user,
                user_name: `${user.first_name.charAt(0)}${user.last_name}`,
                email: `${user.first_name.charAt(0)}${user.last_name}${EMAIL_ADDR.EMAIL}`
            }
            let newUsers = users.map(item => {
                if (item._id === user._id) {
                    item = {...updatedUser};
                    return item
                } else return item
            });
            setUsers([...newUsers]);
        } else {
            setUsers([...users, newUser])
        }

        setIsEditing(false);
        setUpdate(true);

        setUser({
            _id: 0,
            first_name: "",
            last_name: "",
            user_name: "",
            email: "",
            department: "",
            avatar: ""
        })

    }

    const handleEdit = (id) => {
        setIsEditing(true);

        const editUser = users.find(item => item._id === id);
        setUser(editUser);
    }

    const handleDelete = (id) => {
        const updatedUsers = users.filter(item => item._id !== id);

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