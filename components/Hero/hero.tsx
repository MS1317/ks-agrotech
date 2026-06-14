import React from "react";
import style from "./hero.module.css";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className={`${style.hero} relative h-[95vh] w-full overflow-hidden`}>
            {/* Separate backdrop filter overlay for performance */}
            <div className="absolute inset-0 backdrop-brightness-50 transform-gpu will-change-[backdrop-filter] z-0" />
            
            <div className="relative z-[1] w-full max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center py-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="font-semibold text-white">Leading Manufacturer of</h2>
                    <h1 className="text-white">Agricultural Pulleys & Machinery</h1>

                    <div className={style.highlights}>
                        <p>
                            Specializing in V Belt Pulleys, Thresher Pulleys, Reaper Pulleys, Combine Pulleys, and more.
                        </p>
                        <p>
                            Quality engineering solutions from Sahnewal, Punjab, serving the agricultural industry since 2024.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}