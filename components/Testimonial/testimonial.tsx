import React, { useState } from "react";
import styles from "./testimonials.module.css";
import Image from "next/image";

const testimonialArray = [
    {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ar",
        author: "Adam Edward",
        position: "CEO of UNL",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        text: "Outstanding quality and professional service. They exceeded our expectations in every aspect of the project. Highly recommended for anyone looking for reliable solutions.",
        author: "Sarah Johnson",
        position: "CTO of TechCorp",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        text: "Exceptional attention to detail and customer-focused approach. The team delivered exactly what we needed on time and within budget.",
        author: "Michael Chen",
        position: "Director of Operations",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
];

const Testimonial: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonialArray.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonialArray.length - 1 : prevIndex - 1
        );
    };

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
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.author}
                                                width={150}
                                                height={150}
                                            />
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
                            className={`${styles.dot} ${
                                index === currentIndex ? styles.activeDot : ""
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
