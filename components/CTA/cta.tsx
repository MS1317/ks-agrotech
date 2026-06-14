import React from "react";
import style from "./cta.module.css";

const CTA = () => {
  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-[300px]">
        {/* Full-width Backgrounds */}
        <div className="absolute inset-0 flex flex-col md:flex-row z-0">
            <div className={`${style.ctaContainer1} w-full md:w-1/2 h-full`}>
                <div className={`${style.overlay} h-full w-full`}></div>
            </div>
            <div className={`${style.ctaContainer2} w-full md:w-1/2 h-full`}>
                <div className={`${style.overlay} h-full w-full`}></div>
            </div>
        </div>
        
        {/* Constrained Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row text-white">
            <div className="w-full md:w-1/2 flex items-center justify-start py-16 md:py-24 md:pr-12">
                <div className={style.info}>
                    <h4 className="text-3xl font-bold mb-4">Ready to take your business to the next level?</h4>
                    <p className="text-lg opacity-90">
                        Get high-quality agricultural pulleys for your machinery.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-start py-16 md:py-24 md:pl-12">
                <div className={style.info}>
                    <h4 className="text-3xl font-bold mb-4">Premium Quality Pulleys</h4>
                    <p className="text-lg opacity-90">
                        We specialize in V belt pulleys, thresher pulleys, reaper pulleys, combine pulleys, bush type pulleys, cam pulleys, and mudloader pulleys built with precision engineering.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CTA;
