import {AVATAR_URL, EMAIL_ADDR} from "../constants/constants";

// const url = "data/MOCK_USER_DATA.json";
// const storageKey = "users";

const apiUrl = "http://localhost:5000/users";


export const getAllUsers = () => {
    return fetch(apiUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => data);
}

export const getUserByID = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => data);
}

export const saveNewUser = (user) => {
    const userName = `${user.first_name.charAt(0)}${user.last_name}`
    const {_id, ...tempUser} = user;

    const newUser = {
        ...tempUser,
        user_name: userName,
        role: "user",
        password: "1234",
        email: `${userName}${EMAIL_ADDR.EMAIL}`,
        avatar: `${AVATAR_URL.START}${user.user_name}${AVATAR_URL.END}`,
        createdAt: Date.now(),
    }

    fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => {
            console.log(res)
            res.json()
        })

}

export const updateUser = (user) => {
    const updatedUser = {
        ...user,
        user_name: `${user.first_name.charAt(0)}${user.last_name}`,
        email: `${user.first_name.charAt(0)}${user.last_name}${EMAIL_ADDR.EMAIL}`
    }

    fetch(`${apiUrl}/${updatedUser._id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => {
            console.log(res)
            res.json()
        })

}

export const deleteUser = (id) => {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        mode: "cors",
    })
        .then(res => {
            console.log(res)
            res.json()
        })
}


