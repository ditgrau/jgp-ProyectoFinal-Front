import { userData } from '../redux/dataSlice'
import { useSelector } from "react-redux";

export const useAuth = () => {
    const dataSlice = useSelector(userData);
    const token = dataSlice?.token;
    const role = dataSlice?.data?.role_id
    const name = dataSlice?.data?.name
    return {token, role}
}