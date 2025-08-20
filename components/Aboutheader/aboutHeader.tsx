import React from "react";
import style from "./aboutHeader.module.css";

interface Section {
  title: string;
  text: string;
}

export default function AboutHeader({ sections }: { sections: Section[] }) {
  return (
    <>
        <br />
        <br />
        <br />
        <section className={style.aboutHeaderSection}>
        <div className={`${style.aboutContainer} container mx-auto`}>
            <div className={style.contentWrapper}>
            <div className={style.leftContent}>
                <div className={style.headerInfo}>
                <h6 className={style.sectionTag}>About Us</h6>
                <h1 className={style.mainHeading}>Our Company</h1>
                </div>

                <div className={style.contentGrid}>
                {sections.map((block, index) => (
                    <div key={index} className={style.contentBlock}>
                    <h3 className={style.blockTitle}>{block.title}</h3>
                    <p className={style.blockText}>{block.text}</p>
                    </div>
                ))}
                </div>
            </div>

            <div className={style.rightContent}>

            </div>
            </div>
        </div>
        </section>
    </>
  );
}
