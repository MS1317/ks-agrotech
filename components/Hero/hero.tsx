import React from "react";
import "./hero.module.css";

export default function Hero(){
    return(
        <section className="hero relative h-screen w-full overflow-hidden">
            <video width="100%" controls autoPlay muted loop className="heroVideo">                    
                    <source src="/videos/68_1.mp4" type="video/mp4"/>
                </video>
                <div className="backdrop-brightness-50 h-full w-full absolute top-0 left-0 z-10000">
                    <div className="container mx-auto heroContent w-full h-full flex items-center max-w-7xl p-6 lg:px-8">
                        <h1>Most Advance Machinery</h1>
                    </div>
                </div>
        </section>
    )
}