'use client';

import React, { useState, useEffect } from "react";
import style from "./services.module.css";
import Image from "next/image";
import { createClient } from "../../lib/supabase/client";

// Validate URL to prevent next/image from throwing an Invalid URL error
const isValidUrl = (urlStr: string) => {
    if (!urlStr) return false;
    try {
        new URL(urlStr, "http://localhost");
        return true;
    } catch {
        return false;
    }
};

interface ServiceData {
    id: string;
    title: string;
    description: string;
    icon_url: string;
    image_url: string;
    sort_order: number;
}

export default function Services() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const supabase = createClient();

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
            if (data) setServices(data);
        };
        fetchServices();
    }, []);

    if (services.length === 0) return null;

    return (
        <section className={`${style.servicesSec} container-fluid`}>
            <div className={`${style["services-container"]} container mx-auto`}>
                <div className={`${style.info}`}>
                    <h6 className="font-semibold text-center">Our Services</h6>
                    <h2 className="font-bold text-center">Quality Services</h2>
                </div>

                <div className="services flex flex-row flex-wrap justify-center">
                    {services.map((service) => {
                        return (
                            <div key={service.id} className={style.serviceBox}>
                                {service.image_url && isValidUrl(service.image_url) && (
                                    <Image width={500} height={300} src={service.image_url} alt={service.title} />
                                )}
                                <div className={style.serviceInfo}>
                                    <div>
                                        {service.icon_url && isValidUrl(service.icon_url) && (
                                            <Image width={500} height={300} className={style.servImg} src={service.icon_url} alt={`${service.title} icon`} />
                                        )}
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