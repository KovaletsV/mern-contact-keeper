import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, clearCurrent, updateContact, current } = contactContext;

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal"
    });

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({ name: "", email: "", phone: "", type: "personal" });
        }
    }, [contactContext, current]);

    const clearAll = () => {
        clearCurrent();
    };

    const onSubmit = e => {
        if (current === null) {
            e.preventDefault();
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
        console.log(contact);
    };

    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };
    const { name, email, phone, type } = contact;
    return (
        <form onSubmit={onSubmit}>
            <h3 className="text-primary">
                {" "}
                {current ? "Edit Contact" : "Add contact"}
            </h3>
            <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={onChange}
            />
            <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChange}
            />
            <input
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone"
                onChange={onChange}
            />
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === "personal"}
                onChange={onChange}
            />{" "}
            Personal{" "}
            <input
                type="radio"
                name="type"
                value="professional"
                onChange={onChange}
                checked={type === "professional"}
            />{" "}
            Professional
            <div>
                <input
                    type="submit"
                    value={current ? "Update Contact" : "Add contact"}
                    className="btn btn-primary btn-block"
                />
            </div>
            {current && (
                <button className="btn btn-block" onClick={clearAll}>
                    Clear
                </button>
            )}
        </form>
    );
};

export default ContactForm;
