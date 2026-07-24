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
        phone: '',
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const dataToInsert = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                message: formData.phone ? `[Phone: ${formData.phone}]\n\n${formData.message}` : formData.message
            };

            const { error } = await supabase.from('contact_messages').insert([dataToInsert]);

            if (error) throw error;

            setSubmitStatus('success');
            setFormData({ first_name: '', last_name: '', email: '', phone: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={style.faqSection}>
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
                <div className={style.faqGrid}>
                    <div className={style.faqColumn}>
                        <h2 className={style.sectionTitle}>Frequently Asked Questions</h2>
                        <p className={style.sectionSubtitle}>
                            Find answers to common questions about our custom shipping container solutions
                        </p>

                        {faqData.length === 0 ? (
                            <p className={style.loadingText}>Loading FAQs...</p>
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

                    <div className={style.formColumn}>
                        <h3 className={style.formTitle}>Still have questions?</h3>
                        <p className={style.formSubtitle}>
                            Need immediate assistance? Call us directly at <a href="tel:+919915360666" className={style.contactLink}>+91 9915360666</a>
                        </p>
                        
                        <form onSubmit={handleSubmit} className={style.contactForm}>
                            <div className={style.formRow}>
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    required
                                    className={style.formInput}
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    required
                                    className={style.formInput}
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className={style.formInput}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={style.formInput}
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className={style.formTextarea}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={style.submitButton}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {submitStatus === 'success' && (
                                <p className={style.successMessage}>
                                    Thank you! Your message has been sent successfully.
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className={style.errorMessage}>
                                    Sorry, there was an error sending your message. Please try again.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}