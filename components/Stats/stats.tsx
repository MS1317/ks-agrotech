import React from "react";
import style from "./stats.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
export default function Stats() {
    return (
        <motion.section 
            className={`${style.statsSec} container-fluid relative`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            style={{ translateZ: 0 }}
        >
            <div className={`${style["stats-container"]} container mx-auto`}>
                <motion.div 
                    className={`${style.info} h-100 transform-gpu`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h3 className="font-semibold">Our Proud</h3>
                    <h2 className="font-bold">Excellence in Manufacturing</h2>
                    <p className="font-normal">K.S. Agrotech has established itself as a formidable manufacturer in Sahnewal, Punjab, delivering precision-engineered pulleys for demanding agricultural applications.</p>
                </motion.div>
                <motion.div 
                    className={`${style.statsCount} h-100 transform-gpu`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    <motion.div className={`${style.box} transform-gpu`} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div>
                            <h1 className="text-center font-bold">1+</h1>
                            <p className="font-semibold">Years Experience</p>
                        </div>
                    </motion.div>

                    <motion.div className={`${style.box} transform-gpu`} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div>
                            <h1 className="text-center font-bold">15K+</h1>
                            <p className="font-semibold">Parts Produced</p>
                        </div>
                    </motion.div>

                    <motion.div className={`${style.box} transform-gpu`} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div>
                            <h1 className="text-center font-bold">500+</h1>
                            <p className="font-semibold">Happy Clients</p>
                        </div>
                    </motion.div>

                    <motion.div className={`${style.box} transform-gpu`} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div>
                            <h1 className="text-center font-bold">50+</h1>
                            <p className="font-semibold">Product Types</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}