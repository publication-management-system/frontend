import React from 'react'
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoutes = (): React.JSX.Element => {
    const accessToken = localStorage.getItem('access_token')
    return accessToken ? <Outlet /> : <Navigate to={"/"} replace={true} />
}