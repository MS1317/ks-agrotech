'use client';

import ContactHeader from "../../components/ContactHeader/contactHeader"
import { FAQ } from "../../components/FAQ/faq"

export default function ContactPage() {
    return (
        <>
            <ContactHeader />
            <section className="container mx-auto py-12 px-4 lg:px-8 max-w-7xl">
                <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3425.969894459998!2d75.9620586!3d30.830604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a7bc27d14ce67%3A0xc48c035fa3269b91!2sK.s.%20Agrotech!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
            <FAQ />
        </>
    )
}