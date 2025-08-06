import React from "react";
import style from "./stats.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Stats() {
    return (
        <section className="stats-sec container-fluid">
            <div className={`${style["stats-container"]} container mx-auto`}>
                <div className={`${style.info} h-100`}>
                    <h3>Our Proud</h3>
                    <h2>25 years of undefeated success</h2>
                    <p>We have a long and proud history givin emphasis to environment social and economic outcomes to deliver places that respond.</p>
                </div>
                <div className={`${style.statsCount} h-100`}>
                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center">0</h1>
                            <p>Awards</p>
                        </div>
                    </div>

                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center">0</h1>
                            <p>Parts Produced</p>
                        </div>
                    </div>

                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center">0</h1>
                            <p>Ship Repair</p>
                        </div>
                    </div>
                    
                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center">0</h1>
                            <p>Dedicated Customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}