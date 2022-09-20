import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import AuthContext from "../../context/auth/AuthContext";

const PrivateRoute = ({ component: Component }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    if (loading) return <Spinner />;
    if (isAuthenticated) return <Component />;
    return <Navigate to="/login" />;
};

export default PrivateRoute;
