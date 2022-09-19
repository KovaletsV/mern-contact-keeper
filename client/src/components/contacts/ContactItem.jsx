import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
    useContacts,
    deleteContact,
    setCurrent,
    clearCurrent
} from "../../context/contact/ContactState";
import ContactContext from "../../context/contact/ContactContext";
const ContactItem = ({ contact }) => {
    const { id, name, email, phone, type } = contact;

    const contactContext = useContext(ContactContext);

    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    };

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{" "}
                <span
                    style={{ float: "right" }}
                    className={
                        "badge " +
                        (type === "professional"
                            ? "badge-success"
                            : "badge-primary")
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                {email && (
                    <li>
                        <i className="fas fa-envelope-open" /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fas fa-phone" /> {phone}
                    </li>
                )}
            </h3>
            <p>
                <button
                    className=" btn btn-dark btn-sm"
                    onClick={() => setCurrent(contact)}
                >
                    Edit
                </button>
                <button className=" btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

export default ContactItem;
