import axios from "axios";


const ENDPOINT = "http://localhost:8000/api"

const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

export const login = async (data) => {
    let res = await axios.post(`${ENDPOINT}/login`, data)
    return res.data
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