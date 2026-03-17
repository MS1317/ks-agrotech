'use client';

import React, { useState, useEffect } from "react";
import style from "./products.module.css";
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
    }, []);

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
        <section className={style.productsSection}>
            <div className={style.container}>
                <div className={style.header}>
                    <span className={style.ourWorks}>Our Products</span>
                    <h2>Latest Products</h2>
                </div>

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
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={style.projectCard}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
