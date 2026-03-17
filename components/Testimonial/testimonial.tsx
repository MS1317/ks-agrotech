'use client';

import React, { useState, useEffect } from "react";
import styles from "./testimonials.module.css";
import Image from "next/image";
import { createClient } from "../../lib/supabase/client";

// Validate URL to prevent next/image from throwing an Invalid URL error
const isValidUrl = (urlStr: string) => {
    if (!urlStr) return false;
    try {
        new URL(urlStr, "http://localhost");
        return true;
    } catch {
        return false;
    }
};

interface TestimonialData {
    id: string;
    text: string;
    author: string;
    position: string;
    image_url: string;
    sort_order: number;
}

const Testimonial: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonialArray, setTestimonialArray] = useState<TestimonialData[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
            if (data) setTestimonialArray(data);
            setLoading(false);
        };
        fetchTestimonials();
    }, []);

    const nextTestimonial = () => {
        if (testimonialArray.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonialArray.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        if (testimonialArray.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonialArray.length - 1 : prevIndex - 1
        );
    };

    if (loading || testimonialArray.length === 0) {
        return null; // Don't render if loading or empty
    }

    return (
        <section className={styles.testimonialSection}>
            <div className={styles.overlay}></div>
            <div className={styles.testimonialContainer}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.subtitle}>Client Love</span>
                    <div className={styles.underline}></div>
                    <h2 className={styles.title}>Testimonials</h2>
                </div>

                {/* Testimonial Slider */}
                <div className={styles.testimonialContent}>
                    <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevTestimonial}>
                        <span className={styles.arrow}>‹</span>
                    </button>

                    <div className={styles.testimonialSlider}>
                        <div
                            className={styles.sliderTrack}
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonialArray.map((testimonial, index) => (
                                <div key={index} className={styles.testimonialCard}>
                                    <div className={styles.testimonialText}>
                                        <p>{testimonial.text}</p>
                                    </div>

                                    <div className={styles.authorSection}>
                                        <div className={styles.authorImage}>
                                            {testimonial.image_url && isValidUrl(testimonial.image_url) && (
                                                <Image
                                                    src={testimonial.image_url}
                                                    alt={testimonial.author || 'Testimonial Author'}
                                                    width={150}
                                                    height={150}
                                                />
                                            )}
                                        </div>
                                        <div className={styles.authorInfo}>
                                            <h4 className={styles.authorName}>{testimonial.author}</h4>
                                            <p className={styles.authorPosition}>
                                                {testimonial.position}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextTestimonial}>
                        <span className={styles.arrow}>›</span>
                    </button>
                </div>

                {/* Dots indicator */}
                <div className={styles.dotsContainer}>
                    {testimonialArray.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
