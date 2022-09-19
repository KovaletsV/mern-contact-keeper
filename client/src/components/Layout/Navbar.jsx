import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const onLogoout = () => {
        logout();
    };

    const authLinks = (
        <>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogoout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </>
    );

    const guestsLinks = (
        <>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}>{title}</i>
            </h1>
            <ul>{isAuthenticated ? authLinks : guestsLinks}</ul>
        </div>
    );
};

export default Navbar;

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};
Navbar.defaultProps = {
    title: " Contact-keeper",
    icon: "fas fa-id-card-alt"
};
