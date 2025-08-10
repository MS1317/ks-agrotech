import React from "react";
import style from "./cta.module.css";

const CTA = () => {
  return (
    <section className={style.ctaSection}>
        <div className={style.ctaContainer1}>
            <div className={style.overlay}>
                <div className={style.info}>
                    <h4 className={style.ctaHeading}>Ready to take your business to the next level?</h4>
                    <p className={style.ctaDescription}>
                        Join us today and take advantage of our exclusive offers.
                    </p>
                    <button className={style.ctaButton}>Get Started</button>
                </div>
            </div> 
        </div>
            
        <div className={style.ctaContainer2}>
            <div className={style.overlay}>
                <div className={style.info}>
                    <h4 className={style.ctaHeading}>Ready to take your business to the next level?</h4>
                    <p className={style.ctaDescription}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati architecto suscipit facere perspiciatis autem corrupti repudiandae fugit, quos tempore ratione! Incidunt, at quam. Dolore veniam repellat rerum laboriosam delectus obcaecati.
                    </p>
                    <button className={style.ctaButton}>Get Started</button>
                </div>
            </div>
        </div>  
    </section>
  );
};

export default CTA;
