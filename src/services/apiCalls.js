import axios from "axios";


const ENDPOINT = "http://localhost:8000/api"
const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

export const login = async (data) => {
    let res = await axios.post(`${ENDPOINT}/login`, data)
    return res.data;
}

export const getAllGroups = async () => {
    try {
        const res = await axios.get(`${ENDPOINT}/getAllGroups`, config);
        return res.data.data;
    }
    catch (error) {
        console.error("Error retrieving groups:", error);
        return { status: "error", error: error };
    }
}

export const register = async (data) => {
    try {
        let res = await axios.post(`${ENDPOINT}/register`, data, config);
        return res.data;
    }
    catch (error) {
        console.error("Error al registrar:", error);
        return { status: "error", error: error };
    }
}

export const profile = async (token) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const res = await axios.get(`${ENDPOINT}/profile`, configToken);
        return res.data;
    }
    catch (error) {
        console.error("Error retrieving profile:", error);
        return { status: "error", error: error };
    }
}

export const updateProfile = async (body, token) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const res = await axios.put(`${ENDPOINT}/updateProfile`, body, configToken);
        return res.data
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return { status: "error", error: error };
    }
}

export const userUnconfirmed = async (token) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const confirmed = false;
        const res = await axios.get(`${ENDPOINT}/getUserUnconfirmed/${confirmed}`, configToken);
        return res.data
    }
    catch (error) {
        console.error("Error confirming:", error);
        return { status: "error", error: error };
    }
}

export const updateConfirmation = async (data, id, token) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };

        const res = await axios.put(`${ENDPOINT}/updateConfirmation/${id}`, data, configToken);
        return res
    }
    catch (error) {
        console.error("Error confirming:", error);
        return { status: "error", error: error };
    }
}

export const getAllUsers = async (token) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };

        const res = await axios.get(`${ENDPOINT}/getAllUsers`, configToken)
        return res.data.data
    }
    catch (error) {
        console.error("Error getting all users:", error);
        return { status: "error", error: error };
    }
}

export const getMyEvents = async (token) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const res = await axios.get(`${ENDPOINT}/getMyEvents`, configToken);
        return res.data;
    }
    catch (error) {
        console.error(error);
        return { status: "error", error: error };
    }
}

export const getAllEvents = async (token) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const res = await axios.get(`${ENDPOINT}/getAllEvents`, configToken);
        return res.data;
    }
    catch (error) {
        console.error(error);
        return { status: "error", error: error };
    }
}

export const getEventsByType = async (token, id) => {
    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const res = await axios.get(`${ENDPOINT}/getEventsByType/${id}`, configToken);
        return res.data.data;
    }
    catch (error) {
        console.error(error);
        return { status: "error", error: error };
    }
}

export const getMyResults = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.get(`${ENDPOINT}/getMyResults`, configToken)
    return res.data;
}


export const getAllResults = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.get(`${ENDPOINT}/getAllResults`, configToken)
    return res.data;
}

export const myLastResults = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.get(`${ENDPOINT}/myLastResults`, configToken)
    return res.data;
}

export const getAverage = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.get(`${ENDPOINT}/getAverage`, configToken)
    return res.data;
}

export const getMyGroups = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.get(`${ENDPOINT}/getMyGroups`, configToken)
    return res.data.data;
}

export const newEvent = async (data, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.post(`${ENDPOINT}/newEvent`, data, configToken)
    return res.data;
}

export const getAllEventTypes = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.get(`${ENDPOINT}/getAllEventTypes`, configToken)
    return res.data;
}

export const usersByGroupId = async (id, token) => {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const res = await axios.get(`${ENDPOINT}/usersByGroupId/${id}`, configToken);
        return res.data
}