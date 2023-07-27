import { useNavigate } from "react-router-dom"

export function checkRole(role) {

    const navigate = useNavigate()
    if(role === 1){
        navigate('/control')
    } else if(role === 3){
        navigate('/home')
    }
}