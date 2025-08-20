import React from "react";
import { Home, Mail, Phone } from "lucide-react";
import style from "./contactHeader.module.css";

const contactData = [
    {
        icon: <Home size={32} />,
        title: "Address",
        info: "262 Miladina Mrest Street Behansed,",
        type: "address"
    },
    {
        icon: <Mail size={32} />,
        title: "Email",
        info: "support@yoursiteurl.com",
        type: "email"
    },
    {
        icon: <Phone size={32} />,
        title: "Phone",
        info: "+04 3333 6789",
        type: "phone"
    }
];

export default function ContactHeader() {
    return (
        <>
        <br />
        <br />
        <br />
        <section className={style.contactHeaderSection}>
            <div className={`${style.contactContainer} container mx-auto`}>
                <div className={style.headerInfo}>
                    <h6 className={style.sectionTag}>Our Contact</h6>
                    <h1 className={style.mainHeading}>Contact Us</h1>
                </div>

                <div className={style.contactGrid}>
                    {contactData.map((contact, index) => {
                        return (
                            <div key={index} className={style.contactCard}>
                                <div className={style.iconContainer}>
                                    <div className={style.contactIcon}>{contact.icon}</div>
                                </div>
                                <h3 className={style.contactTitle}>{contact.title}</h3>
                                <p className={style.contactInfo}>{contact.info}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
        </>
    )
}