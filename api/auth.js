import { API_ENDPOINT } from "../config/apiConfig";

/*
    functions list:
        login
        signUp
        forgotPassword
        logOut
        checkCode
        resetPassword
        getAllUsers
*/

export const login = async (data) => {
    /*
    data = {
    "email" :"anhtrung24102K@gmail.com",
    "password" :"12345678"
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};


export const signUp = async (data) => {
    /*
    data =  {
    "name" :"Hoang Van Trung",
    "email" :"anhtrung24102K@gmail.com",
    "password" :"12345678"
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const forgotPassword = async (data) => {
    const response = await fetch(`${API_ENDPOINT}/api/auth/forgotPassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: String(data)
        }),

    });
    return response.json();
}

export const logOut = async (token) => {
    const response = await fetch(`${API_ENDPOINT}/api/auth/logout`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
}

export const checkCode = async (data) => {
    /*
    data = {
    "email":"anhtrung24102K@gmail.com",
    "verificationCode": 600804
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/auth/checkCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const resetPassword = async (data) => {
    /*
    data = {
    "email":"anhtrung24102K@gmail.com",
    "newPassword":"12345678"
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/auth/resetPassword`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}




// this is for testing only
export const getAllUsers = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/users`, {
        method: 'GET',
    });
    return response.json();
}
