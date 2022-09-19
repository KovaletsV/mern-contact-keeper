import React, { useReducer } from "react";
import ContactContext from "../contact/ContactContext";
import ContactReducer from "../contact/ContactReducer";
import { v4 } from "uuid";

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "vu",
                email: "vu@gmail.com",
                phone: "111 111",
                type: "personal"
            },
            {
                id: 2,
                name: "ku",
                email: "ku@gmail.com",
                phone: "111 1112",
                type: "professional"
            },
            {
                id: 3,
                name: "su",
                email: "su@gmail.com",
                phone: "111 1113",
                type: "professional"
            }
        ],
        current: null,
        filtered: null
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // ADD_CONTACT

    const addContact = contact => {
        contact.id = v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // DELETE_CONTACT,

    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };
    // SET_CURRENT,
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    // CLEAR_CURRENT,
    const clearCurrent = contact => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // UPDATE_CONTACT,
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };
    // FILTER_CONTACTS,
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    // CLEAR_FILTER
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
                current: state.current,
                filtered: state.filtered,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
