import { API_ENDPOINT } from "../config/apiConfig";

export const addExpense = async (data, token) => {
    /*
    data = {
    "name":"Hoang trung",
    "price":10000,
    "time":"2023-12-31"
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const updateExpense = async (data, token) => {
    /*
    data = {
    "name":"Hoang trung",
    "price":10000,
    "time":"2023-12-31",
    "expenseId": 22
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/expenses/${data.expenseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const deleteExpense = async (data, token) => {
    /*
    data = {
    "expenseId": 22
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/expenses/${data.expenseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
}

export const getAllExpenses = async (token) => {
    const response = await fetch(`${API_ENDPOINT}/api/expenses`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
}

export const getExpense = async (data, token) => {
    /*
    data = {
    "expenseId": 22
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/expenses/${data.expenseId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
}

export const addRevenue = async (data, token) => {
    /*
    data = {
    "name":"Hoang trung",
    "price":10000,
    "time":"2023-12-31"
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/revenues`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const updateRevenue = async (data, token) => {
    /*
    data = {
    "name":"Hoang trung",
    "price":10000,
    "time":"2023-12-31",
    "revenueId": 22
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/revenues/${data.revenueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const deleteRevenue = async (data, token) => {
    /*
    data = {
    "revenueId": 22
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/revenues/${data.revenueId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
}

export const getAllRevenues = async (token) => {
    const response = await fetch(`${API_ENDPOINT}/api/revenues`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
}

export const getRevenue = async (data, token) => {
    /*
    data = {
    "revenueId": 22
    }
    */
    const response = await fetch(`${API_ENDPOINT}/api/revenues/${data.revenueId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
}