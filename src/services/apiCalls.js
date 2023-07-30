import axios from "axios";


const ENDPOINT = "https://backend-proyectofinal.vercel.app/api"
const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

export const login = async (data) => {
    let res = await axios.post(`${ENDPOINT}/api/login`, data)
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

export const getUsersByGroup = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/getUsersByGroup/${id}`, configToken);
    return res.data
}

export const getUserByName = async (name, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/getUserByName/${name}`, configToken);
    return res.data
}

export const getUserById = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/getUserById/${id}`, configToken);
    return res.data.data
}

export const getAllRoles = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/getAllRoles`, configToken);
    return res.data.data
}

export const addResult = async (data, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.post(`${ENDPOINT}/addResult`, data, configToken)
    return res.data;
}

export const getClubAverage = async (token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    let res = await axios.get(`${ENDPOINT}/clubAverage`, configToken)
    return res.data;
}

export const getResultById = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/getResultById/${id}`, configToken);
    return res.data.data
}

export const myEventById = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/myEventById/${id}`, configToken);
    return res.data.data
}

export const getEventById = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/getEventById/${id}`, configToken);
    return res.data.data
}

export const deleteUserById = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.delete(`${ENDPOINT}/deleteUserById/${id}`, configToken);
    return res
}

export const deleteResult = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.delete(`${ENDPOINT}/deleteResult/${id}`, configToken);
    return res
}


export const myEventsByType = async (id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${ENDPOINT}/myEventsByType/${id}`, configToken);
    return res.data
}

export const updateUserRole = async (data, id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.put(`${ENDPOINT}/updateUserRole/${id}`, data, configToken);
    return res.data
}


///// implementar en user detail 
export const updateUserGroup = async (data, id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.put(`${ENDPOINT}/updateUserGroup/${id}`, data, configToken);
    return res.data
}

/////////////////////////// implementar en newEvent

export const addUserToEvent = async (data, id, token) => {
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.post(`${ENDPOINT}/addUserToEvent/${id}`, data, configToken);
    return res.data
}

/////////////////////////////////////////////////////////////////////////////////