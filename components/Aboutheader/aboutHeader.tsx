import React from "react";
import style from "./aboutHeader.module.css";
import { motion } from "framer-motion";

interface Section {
  title: string;
  text: string;
}

export default function AboutHeader({ sections }: { sections: Section[] }) {
  return (
    <>

      <motion.section
        className={style.aboutHeaderSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        <div className={`${style.aboutContainer} w-full max-w-7xl mx-auto px-4 lg:px-8`}>
          <div className={style.contentWrapper}>
            <div className={style.leftContent}>
              <motion.div
                className={style.headerInfo}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <h6 className={style.sectionTag}>About Us</h6>
                <h1 className={style.mainHeading}>Our Company</h1>
              </motion.div>

              <motion.div
                className={style.contentGrid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.2 } }
                }}
              >
                {sections.map((block, index) => (
                  <motion.div
                    key={index}
                    className={style.contentBlock}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <h3 className={style.blockTitle}>{block.title}</h3>
                    <p className={style.blockText}>{block.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className={style.rightContent}>

            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
