'use client';

import React, { useState, useEffect } from "react";
import style from "./faq.module.css";
import { createClient } from "../../lib/supabase/client";

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    sort_order: number;
}

export const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [faqData, setFaqData] = useState<FAQItem[]>([]);

    // Form state
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const supabase = createClient();

    useEffect(() => {
        const fetchFAQs = async () => {
            const { data } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
            if (data) {
                setFaqData(data);
            }
        };
        fetchFAQs();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const { error } = await supabase.from('contact_queries').insert([formData]);

        if (error) {
            console.error("Error submitting form", error);
            setSubmitStatus('error');
        } else {
            setSubmitStatus('success');
            setFormData({ first_name: '', last_name: '', email: '', message: '' }); // reset
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
        setIsSubmitting(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className={style.faqSection}>
            <div className={style.container}>
                <div className={style.contactForm}>
                    <h2>Name</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className={style.nameRow}>
                            <div className={style.inputGroup}>
                                <label htmlFor="first_name">First Name *</label>
                                <input type="text" id="first_name" name="first_name" placeholder="First Name" required value={formData.first_name} onChange={handleInputChange} />
                            </div>
                            <div className={style.inputGroup}>
                                <label htmlFor="last_name">Last Name *</label>
                                <input type="text" id="last_name" name="last_name" placeholder="Last Name" required value={formData.last_name} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} />
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="message">Comment or Message</label>
                            <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleInputChange}></textarea>
                        </div>

                        <button type="submit" className={style.submitBtn} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>

                        {submitStatus === 'success' && (
                            <p className="mt-4 text-green-500 font-medium">Thank you! Your message has been sent.</p>
                        )}
                        {submitStatus === 'error' && (
                            <p className="mt-4 text-red-500 font-medium">An error occurred. Please try again.</p>
                        )}
                    </form>
                </div>

                <div className={style.faqContainer}>
                    <div className={style.faqHeader}>
                        <span className={style.learnMore}>Learn More From</span>
                        <h2>Our FAQ</h2>
                    </div>

                    {faqData.length === 0 ? (
                        <p className="text-gray-500 mt-4">No FAQs available at the moment.</p>
                    ) : (
                        faqData.map((faq, index) => (
                            <div key={faq.id} className={style.faqItem}>
                                <button
                                    type="button"
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
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}