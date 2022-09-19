import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;
    if (contacts === 0) {
        return <h4>Please add a contact...</h4>;
    }

    return (
        <>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map(contact => (
                          <CSSTransition
                              key={contact.id}
                              timeout={500}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))
                    : contacts.map(contact => (
                          <CSSTransition
                              key={contact.id}
                              timeout={500}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))}
            </TransitionGroup>
        </>
    );
};

export default Contacts;
