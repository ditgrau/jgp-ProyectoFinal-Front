import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export function Body() {
    return (

        <Routes className='bodyRoutes'>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>

    )
}