
import React, { useEffect, useState } from "react";
import style from "./cta.module.css";

export const CTA2 = () => {

    return (
        <section className={style.ctaSection}>
            <div 
                className={style.parallaxBackground}
                // style={{
                //     transform: `translateY(${scrollY * 0.5}px)`
                // }}
            ></div>
            <div className={style.overlay}></div>
            
            <div className={style.content}>
                <div className={style.textContent}>
                    <h2>We Offer Professional Consultation For Free</h2>
                    <p>Everything should be as simple as it is, but not simpler as you</p>
                </div>
                <div className={style.ctaButton}>
                    <button className={style.contactBtn}>
                        Contact Us
                        <span className={style.star}>★</span>
                    </button>
                </div>
            </div>
        </section>
    );
};