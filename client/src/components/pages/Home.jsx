import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

const Home = () => {
    const authContext = useContext(AuthContext);

    const contactContext = useContext(ContactContext);
    const { contacts } = contactContext;

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
                {contacts.length > 0 ? (
                    <Contacts />
                ) : (
                    <h1 style={{ textAlign: "center" }}>Contacts not found</h1>
                )}
                <ContactFilter />
            </div>
        </div>
    );
};

export default Home;
