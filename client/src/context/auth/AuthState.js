import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import AuthReducer from "../auth/AuthReducer";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    // LOGOUT,
    CLEAR_ERRORS
} from "../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // load user
    const loadUser = async () => {
        try {
            const res = await axios.get("/api/auth");

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // register user
    const register = async formData => {
        try {
            const res = await axios.post("/api/users", formData);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser(dispatch);
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };
    // login user
    const login = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await axios.post("/api/auth", formData, config);
            console.log(res);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.message
            });
            console.log(err.response.data.message);
        }
    };

    // logout
    const logout = () => {
        console.log("out");
    };
    // clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                errors: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
