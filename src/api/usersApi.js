import {v4 as uuidv4} from "uuid";
import {AVATAR_URL, EMAIL_ADDR} from "../constants/constants";

const url = "data/MOCK_USER_DATA.json";
const storageKey = "users";


export const getAllUsers = () => {
    if (JSON.parse(localStorage.getItem(storageKey))) {
        return JSON.parse(localStorage.getItem(storageKey));
    } else {
       return  fetch(url)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem(storageKey, JSON.stringify(data))
            })
    }

}

export const getUserByID = (id) => {
    const users = getAllUsers();

    return  users.find(user => user._id === id);
}

export const saveNewUser = (user) => {
    const updatedUsers = getAllUsers();
    const userName = `${user.first_name.charAt(0)}${user.last_name}`

    const newUser = {
        ...user,
        _id: uuidv4(),
        user_name: userName,
        email: `${userName}${EMAIL_ADDR.EMAIL}`,
        avatar: `${AVATAR_URL.START}${user.user_name}${AVATAR_URL.END}`,
        createdAt: Date.now(),
    }

    updatedUsers.push(newUser);

    localStorage.setItem(storageKey, JSON.stringify(updatedUsers));

    return updatedUsers
}

export const updateUser = (user) => {
    const users = getAllUsers();

    let updatedUsers = users.map(item =>
        item._id === user._id
            ? ({
                ...user,
                user_name: `${user.first_name.charAt(0)}${user.last_name}`,
                email: `${user.first_name.charAt(0)}${user.last_name}${EMAIL_ADDR.EMAIL}`
            })
            : item
    )

    localStorage.setItem(storageKey, JSON.stringify(updatedUsers));

    return updatedUsers
}

export const deleteUser = (id) => {
    const users = getAllUsers();

    let updatedUsers = users.filter(item =>
        item._id !== id
    )

    localStorage.setItem(storageKey, JSON.stringify(updatedUsers));
    return updatedUsers
}


