import React, { useReducer } from "react";
import ContactContext from "../contact/ContactContext";
import ContactReducer from "../contact/ContactReducer";
import axios from "axios";

import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    CONTACT_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //GET_CONTACTS
    const getContacts = async () => {
        try {
            const res = await axios.get("/api/contacts");
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    // ADD_CONTACT

    const addContact = async contact => {
        try {
            const res = await axios.post("/api/contacts", contact);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    // UPDATE_CONTACT,
    const updateContact = async contact => {
        try {
            const res = await axios.put(
                `/api/contacts/${contact._id}`,
                contact
            );
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    // DELETE_CONTACT

    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };
    // CLEAR_CONTACTS
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };
    // SET_CURRENT
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    // CLEAR_CURRENT,
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
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
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                getContacts,
                deleteContact,
                clearContacts,
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
