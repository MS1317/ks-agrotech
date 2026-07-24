import React, { useState } from "react";
import style from "./projects.module.css";
import Image from "next/image";

export const Products = () => {
    const [activeFilter, setActiveFilter] = useState("Show All");
    const [isAnimating, setIsAnimating] = useState(false);

    const filterOptions = ["Show All", "Grinding Machines", "Rotary Tables", "Vertical Lathes"];

    const productsData = [
        {
            id: 1,
            title: "Vertical Lathes",
            category: "Vertical Lathes",
            image: "/images/Projects/p6-1.jpg",
            description: "High precision vertical lathe manufacturing"
        },
        {
            id: 2,
            title: "Grinding Machines",
            category: "Grinding Machines",
            image: "/images/Projects/p6-1.jpg",
            description: "Advanced grinding machine solutions"
        },
        {
            id: 3,
            title: "Rotary Tables",
            category: "Rotary Tables",
            image: "/images/Projects/p6-1.jpg",
            description: "Precision rotary table systems"
        },
        {
            id: 4,
            title: "Grinding Machines",
            category: "Grinding Machines",
            image: "/images/Projects/p6-1.jpg",
            description: "Industrial grinding solutions"
        },
        {
            id: 5,
            title: "Rotary Tables",
            category: "Rotary Tables",
            image: "/images/Projects/p6-1.jpg",
            description: "Heavy duty rotary systems"
        },
        {
            id: 6,
            title: "Grinding Machines",
            category: "Grinding Machines",
            image: "/images/Projects/p6-1.jpg",
            description: "Professional grinding equipment"
        }
    ];

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

    return (
        <section className={style.projectsSection}>
            <div className={style.container}>
                <div className={style.header}>
                    <span className={style.ourWorks}>Our Products</span>
                    <h2>Latest Products</h2>
                </div>

                <div className={style.filterButtons}>
                    {filterOptions.map((filter) => (
                        <button
                            key={filter}
                            className={`${style.filterBtn} ${activeFilter === filter ? style.active : ''}`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className={`${style.projectsGrid} ${isAnimating ? style.animating : ''}`}>
                    {filteredProducts.map((product, index) => (
                        <div 
                            key={product.id} 
                            className={style.projectCard}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div className={style.imageContainer}>
                                <Image src={product.image} alt={product.title} width={500} height={300} />
                                <div className={style.overlay}>
                                    <h3>{product.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};