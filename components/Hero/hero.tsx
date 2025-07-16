import React from "react";
import style from "./hero.module.css";

export default function Hero(){
    return(
        <section className="hero relative h-[95vh] w-full overflow-hidden">
            <video width="100%" muted className={style.heroVideo}>                    
                    <source src="/videos/68_1.mp4" type="video/mp4"/>
                </video>
                <div className="backdrop-brightness-50 h-full w-full absolute top-0 left-0">
                    <div className="container mx-auto heroContent max-w-[1280] w-full h-full flex items-center py-6 px-8 ">
                        <div>
                            <h2 className="font-semibold">Leading Manufacturer of </h2>
                            <h1>Agricultural Pulleys & Machinery</h1>

                            <div className={style.highlights}>
                                <p>
                                    Specializing in V Belt Pulleys, Timing Pulleys, and more.
                                </p>
                                <p>
                                    Explore our range of high-quality products designed for efficiency and durability.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
        </section>
    )
}