import React, { useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import Spinner from "../Layout/Spinner";

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts.length === 0) {
        return <h4>Please add a contact...</h4>;
    }

    return (
        <>
            {contacts.length > 0 ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={500}
                                  classNames="item"
                              >
                                  <ContactItem contact={contact} />
                              </CSSTransition>
                          ))
                        : contacts.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={500}
                                  classNames="item"
                              >
                                  <ContactItem contact={contact} />
                              </CSSTransition>
                          ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default Contacts;
