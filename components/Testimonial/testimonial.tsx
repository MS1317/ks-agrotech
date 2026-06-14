'use client';

import React from "react";
import styles from "./testimonials.module.css";
import Image from "next/image";
import { createClient } from "../../lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
    const [testimonialArray, setTestimonialArray] = React.useState<TestimonialData[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0);
    const supabase = createClient();

    React.useEffect(() => {
        const fetchTestimonials = async () => {
            const { data } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
            if (data) setTestimonialArray(data);
            setLoading(false);
        };
        fetchTestimonials();
    }, []);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonialArray.length) % testimonialArray.length);
    };

    if (loading || testimonialArray.length === 0) {
        return null;
    }

    return (
        <section className={styles.testimonialSection}>
            <div className={`${styles.testimonialContainer} w-full max-w-7xl mx-auto px-4 lg:px-8`}>
                <div className={styles.header}>
                    <span className={styles.subtitle}>Client Feedback</span>
                    <div className={styles.underline}></div>
                    <h2 className={styles.title}>What Our Clients Say</h2>
                </div>

                <div className={styles.sliderWrapper}>
                    <div className={styles.sliderContainer}>
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className={styles.testimonialCard}
                            >
                                <div className={styles.quoteIcon}>&quot;</div>
                                <div className={styles.testimonialText}>
                                    <p>{testimonialArray[currentIndex].text}</p>
                                </div>

                                <div className={styles.authorSection}>
                                    <div className={styles.authorImage}>
                                        {testimonialArray[currentIndex].image_url && isValidUrl(testimonialArray[currentIndex].image_url) ? (
                                            <Image
                                                src={testimonialArray[currentIndex].image_url}
                                                alt={testimonialArray[currentIndex].author || 'Testimonial Author'}
                                                width={60}
                                                height={60}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>
                                                {testimonialArray[currentIndex].author?.charAt(0) || 'C'}
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <h4 className={styles.authorName}>{testimonialArray[currentIndex].author}</h4>
                                        <p className={styles.authorPosition}>
                                            {testimonialArray[currentIndex].position}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className={`${styles.navButton} ${styles.prev}`} onClick={() => paginate(-1)}>
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button className={`${styles.navButton} ${styles.next}`} onClick={() => paginate(1)}>
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>

                    <div className={styles.dots}>
                        {testimonialArray.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;