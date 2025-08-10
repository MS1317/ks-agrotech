import React from "react";
import style from "./services.module.css";

const serviceArray=[
    {
        title: "Support Center",
        description: "24/7 customer support",
        icon: <img className={style.servImg} src={"../images/Home/services/industrial-robot.png"} alt="Support Center" />,
        img: <img src={"../images/Home/services/sv1.jpg"} alt="Support Center" />
    },
    {
        title: "Rebuild",
        description: "Rebuild your infrastructure",
        icon: <img className={style.servImg} src={"../images/Home/services/industrial-robot.png"} alt="Rebuild" />,
        img: <img src={"../images/Home/services/sv1.jpg"} alt="Rebuild" />
    },
    {
        title: "Efficiency Upgrade",
        description: "Upgrade your systems for better performance",
        icon: <img className={style.servImg} src={"../images/Home/services/industrial-robot.png"} alt="Efficiency Upgrade" />,
        img: <img src={"../images/Home/services/sv1.jpg"} alt="Efficiency Upgrade" />
    },
    {
        title: "Efficiency Upgrade",
        description: "Upgrade your systems for better performance",
        icon: <img className={style.servImg} src={"../images/Home/services/industrial-robot.png"} alt="Efficiency Upgrade" />,
        img: <img src={"../images/Home/services/sv1.jpg"} alt="Efficiency Upgrade" />
    },
    {
        title: "Efficiency Upgrade",
        description: "Upgrade your systems for better performance",
        icon: <img className={style.servImg} src={"../images/Home/services/industrial-robot.png"} alt="Efficiency Upgrade" />,
        img: <img src={"../images/Home/services/sv1.jpg"} alt="Efficiency Upgrade" />
    },
    {
        title: "Efficiency Upgrade",
        description: "Upgrade your systems for better performance",
        icon: <img className={style.servImg} src={"../images/Home/services/industrial-robot.png"} alt="Efficiency Upgrade" />,
        img: <img src={"../images/Home/services/sv1.jpg"} alt="Efficiency Upgrade" />
    }
]

export default function Services(){
    return(
        <section className="services-sec container-fluid">
            <div className={`${style["services-container"]} container mx-auto`}>
                <div className={`${style.info}`}>
                    <h6 className="font-semibold text-center">Our Services</h6>
                    <h2 className="font-bold text-center">Quality Services</h2>
                </div>

                <div className="services flex flex-row flex-wrap justify-center">
                    {serviceArray.map((service,index)=>{
                        return (
                            <div key={index} className={style.serviceBox}>
                                <img src={service.img.props.src} alt={service.img.props.alt} />
                                <div className={style.serviceInfo}>
                                    <div>
                                        {service.icon}
                                    </div>
    
                                    <div>
                                        <h6>{service.title}</h6>
                                        <p>{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}