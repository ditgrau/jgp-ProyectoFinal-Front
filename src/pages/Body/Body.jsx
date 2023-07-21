import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Auth/Login";
import { Register } from "../Auth/Register";
import { Home } from "../Home/Home";
import { Profile } from "../Profile/Profile";
import { Calendar } from "../Calendar/Calendar";
import { Results } from "../Results/Results";
import { Control } from "../Control/Control";

export function Body() {
    return (

        <Routes className='bodyRoutes'>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/control" element={<Control/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/results" element={<Results/>}/>
        </Routes>

    )
}