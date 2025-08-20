import React from "react";
import style from "./stats.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Stats() {
    return (
        <section className={`${style.statsSec} container-fluid`}>
            <div className={`${style["stats-container"]} container mx-auto`}>
                <div className={`${style.info} h-100`}>
                    <h3 className="font-semibold">Our Proud</h3>
                    <h2 className="font-bold">25 years of undefeated success</h2>
                    <p className="font-normal">We have a long and proud history givin emphasis to environment social and economic outcomes to deliver places that respond.</p>
                </div>
                <div className={`${style.statsCount} h-100`}>
                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center font-bold">0</h1>
                            <p className="font-semibold">Awards</p>
                        </div>
                    </div>

                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center font-bold">0</h1>
                            <p className="font-semibold">Parts Produced</p>
                        </div>
                    </div>

                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center font-bold">0</h1>
                            <p className="font-semibold">Ship Repair</p>
                        </div>
                    </div>
                    
                    <div className={style.box}>
                        <div className={style.icon}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div>
                            <h1 className="text-center font-bold">0</h1>
                            <p className="font-semibold">Dedicated Customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}