'use client';

import React, { useState, useEffect } from "react";
import style from "./products.module.css";
import Image from "next/image";
import { createClient } from "../../lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

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

interface ProductData {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    sort_order: number;
}

export const Products = () => {
    const [activeFilter, setActiveFilter] = useState("Show All");
    const [isAnimating, setIsAnimating] = useState(false);
    const [productsData, setProductsData] = useState<ProductData[]>([]);
    const [categories, setCategories] = useState<string[]>(["Show All"]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('*').order('sort_order', { ascending: true });
            if (data) {
                setProductsData(data);
                // Extract unique categories
                const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
                setCategories(["Show All", ...uniqueCategories]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [supabase]);

    const filteredProducts = activeFilter === "Show All"
        ? productsData
        : productsData.filter(product => product.category === activeFilter);

    const handleFilterChange = (filter: string) => {
        if (filter !== activeFilter) {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveFilter(filter);
                setTimeout(() => setIsAnimating(false), 50);
            }, 200);
        }
    };

    if (loading || productsData.length === 0) return null;

    return (
        <motion.section 
            className={style.productsSection}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
        >
            <div className={style.container}>
                <motion.div 
                    className={style.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={style.ourWorks}>Our Products</span>
                    <h2>Latest Products</h2>
                </motion.div>

                <div className={style.filterButtons}>
                    {categories.map((filter) => (
                        <button
                            key={filter}
                            className={`${style.filterBtn} ${activeFilter === filter ? style.active : ''}`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className={`${style.productsGrid} ${isAnimating ? style.animating : ''}`}>
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                layout
                                key={product.id}
                                className={style.projectCard}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div className={style.imageContainer}>
                                    {product.image_url && isValidUrl(product.image_url) && (
                                        <Image src={product.image_url} alt={product.title} width={500} height={300} />
                                    )}
                                    <div className={style.overlay}>
                                        <h3>{product.title}</h3>
                                        <p style={{ color: 'white', fontSize: '14px', marginTop: '5px' }}>{product.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    );
};
