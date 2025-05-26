import React from "react";
import "./hero.module.css";

export default function Hero(){
    return(
        <section className="hero relative">
            <video width="100%" controls autoPlay muted loop className="heroVideo">                    
                    <source src="/videos/68_1.mp4" type="video/mp4"/>
                </video>
              <div className="backdrop-brightness-50 heroContent absolute top-0 left-0 w-full h-full flex items-center justify-center">
                hello
            </div>
        </section>
    )
}