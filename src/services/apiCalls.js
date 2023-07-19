import axios from "axios";


const ENDPOINT = "http://localhost:8000/api"


export const login = async (data) => {
    let res = await axios.post(`${ENDPOINT}/login`, data)
    return res.data
}