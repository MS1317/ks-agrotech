
import React from "react";
import style from "./cta.module.css";

export const CTA2 = () => {

    return (
        <section className={style.ctaSection}>
            <div 
                className={style.parallaxBackground}
            ></div>
            <div className={style.overlay}></div>
            
            <div className={style.content}>
                <div className={style.textContent}>
                    <h2>Get Expert Consultation for Your Pulley Needs</h2>
                    <p>Contact us today for personalized solutions tailored to your requirements</p>
                </div>
                <div className={style.ctaButton}>
                    <a href="#contact-form" className={style.contactBtn}>
                        Contact Us
                        <span className={style.star}>★</span>
                    </a>
                </div>
            </div>
        </section>
    );
};