import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({component, ...props}) {
    if (props.isAuth) {
        return component
    } else {
        return <Navigate to="/"></Navigate>
    }
}

export default ProtectedRoute