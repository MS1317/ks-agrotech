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
                        Get high-quality agricultural pulleys for your machinery.
                    </p>
                </div>
            </div> 
        </div>
            
        <div className={style.ctaContainer2}>
            <div className={style.overlay}>
                <div className={style.info}>
                    <h4 className={style.ctaHeading}>Premium Quality Pulleys</h4>
                    <p className={style.ctaDescription}>
                        We specialize in V belt pulleys, thresher pulleys, reaper pulleys, combine pulleys, bush type pulleys, cam pulleys, and mudloader pulleys built with precision engineering.
                    </p>
                </div>
            </div>
        </div>  
    </section>
  );
};

export default CTA;
