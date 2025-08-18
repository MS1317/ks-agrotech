import React, { useState } from "react";
import style from "./faq.module.css";

export const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        {
            question: "How to create cities and communities that solve?",
            answer: "Answer to question 1 about creating cities and communities that solve various urban challenges."
        },
        {
            question: "Construction of the winning $45 million?",
            answer: "Answer to question 2 about the construction details of the $45 million project."
        },
        {
            question: "How can I get news on 2020 in buildbench?",
            answer: "Answer to question 3 about getting news and updates on 2020 buildbench developments."
        }
    ];

    return(
        <section className={style.faqSection}>
            <div className={style.container}>
                <div className={style.contactForm}>
                    <h2>Name</h2>
                    <form>
                        <div className={style.nameRow}>
                            <div className={style.inputGroup}>
                                <input type="text" id="firstName" name="firstName" placeholder="First" required />
                                <label htmlFor="firstName">First</label>
                            </div>
                            <div className={style.inputGroup}>
                                <input type="text" id="lastName" name="lastName" placeholder="Last" required />
                                <label htmlFor="lastName">Last</label>
                            </div>
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="message">Comment or Message</label>
                            <textarea id="message" name="message" rows={6}></textarea>
                        </div>

                        <button type="submit" className={style.submitBtn}>Submit</button>
                    </form>
                </div>

                <div className={style.faqContainer}>
                    <div className={style.faqHeader}>
                        <span className={style.learnMore}>Learn More From</span>
                        <h2>Our FAQ</h2>
                    </div>
                    
                    {faqData.map((faq, index) => (
                        <div key={index} className={style.faqItem}>
                            <button 
                                className={style.faqQuestion}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{index + 1}. {faq.question}</span>
                                <span className={style.toggleIcon}>
                                    {openFAQ === index ? '−' : '+'}
                                </span>
                            </button>
                            {openFAQ === index && (
                                <div className={style.faqAnswer}>
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}