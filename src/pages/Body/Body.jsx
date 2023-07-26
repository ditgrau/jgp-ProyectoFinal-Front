import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Auth/Login";
import { Register } from "../Auth/Register";
import { Home } from "../Home/Home";
import { Profile } from "../Profile/Profile";
import { Calendar } from "../Calendar/Calendar";
import { Results } from "../Results/Results";
import { Control } from "../Control/Control";
import { Users } from "../Users/Users";
import { Credentials } from "../Credentials/Credentials";
import { useAuth } from '../../hooks/useAuth';
import { Agenda } from "../Agenda/Agenda";
import { Unconfirmed } from "../Auth/Unconfirmed";
import { NewEvent } from "../newEvent/newEvent";
import { DetailUser } from "../DetailUser/DetailUser";
import { DetailResult } from "../Results/DetailResult";
import { AddResult } from "../Results/AddResult";

export function Body() {
    const { token, role } = useAuth();
    const [view, setView] = useState('');

    useEffect(() => {
        const changeView = !token
            ? '/login'
            : role === 1
                ? '/control'
                : role === 3
                    ? '/home'
                    : '/login';
        setView(changeView);
    }, [token, role]);

    return (
        <Routes className='bodyRoutes'>
            <Route path="*" element={<Navigate to={view} />} />
            <Route path="/" element={<Navigate to={view} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unconfirmed" element={<Unconfirmed />} />
            
            <Route path="/home" element={<Home />} />
            <Route path="/control" element={<Control />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/results" element={<Results />} />
            <Route path="/detailResult" element={<DetailResult/>} />
            <Route path="/addResult" element={<AddResult/>} />

            <Route path="/users" element={<Users />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/newEvent" element={<NewEvent/>} />
            <Route path="/detailUser" element={<DetailUser/>} />

        </Routes>

    )
}