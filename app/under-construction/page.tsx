'use client';
import React, { useEffect } from "react";
import styles from "./underConstruction.module.css";
import {LOGO_SRC, LOGO_ALT, SITE_NAME, MAINTENANCE_MODE} from "../../lib/constants";
import Image from "next/image";
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { useRouter } from "next/navigation";
import Link from "next/link";

const UnderConstruction:React.FC = () => {
    const router = useRouter();
    useEffect(() => {
        if (!MAINTENANCE_MODE) {
            router.push("/"); // 👈 Redirect to home
        }
    }, [router]);
const [firstPart, ...rest] = SITE_NAME.split(" ");
const secondPart = rest.join(" ");    

  useEffect(() => {
    const canvas = document.querySelector('#dotlottie-canvas') as HTMLCanvasElement;

    if (canvas) {
      const dotLottie = new DotLottie({
        autoplay: true,
        loop: true,
        canvas: canvas,
        src: 'https://lottie.host/808ee275-6c62-4bdc-8968-68c2922fd501/5daXd4CnqT.lottie',
      });

      // Optional: clean up
      return () => {
        dotLottie?.destroy?.(); // if available
      };
    }
  }, []);


    return (
            <div className={`${styles.webpage} webpage`}>
                <div className={`${styles['right-triangle']} right-triangle`}></div>
                <div className={styles.main}>
                {LOGO_SRC ?(
                    <Image 
                        src={LOGO_SRC}
                        alt={LOGO_ALT}
                        width={150}
                        height={150}
                        />
                ):(
                    <Link href="/" className="logo">
                        <span className="font-bold">
                            <span className="first-name">{firstPart} </span>
                            <span className="second-name">{secondPart}</span>
                        </span>
                    </Link>
                )}

                <h3 className={styles['presents-text']}>We are Currently</h3>
                     <h1 className={styles.title}>
                        Under <br /> Construction
                    </h1>

                    <div className={styles.contact}>
                        <canvas id="dotlottie-canvas" style={{ width: '50px', height: '50px' }}></canvas>
                        <a className={styles.tel} href="tel: 09915360666">- &nbsp; 099153 60666</a>
                    </div>
                </div>
            </div>
    ); 
};

export default UnderConstruction;