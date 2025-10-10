import React, { useState, useRef, useEffect } from "react";
import style from "./projects.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

export const Projects = () => {
    const [activeFilter, setActiveFilter] = useState("Show All");
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any|null>(null);
    const [modalOrigin, setModalOrigin] = useState({ x: 0, y: 0 });
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const filterOptions = ["Show All", "Grinding Machines", "Rotary Tables", "Vertical Lathes"];

    const projectsData = [
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

    const filteredProjects = activeFilter === "Show All" 
        ? projectsData 
        : projectsData.filter(project => project.category === activeFilter);

    const handleFilterChange = (filter: string) => {
        if (filter !== activeFilter) {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveFilter(filter);
                setTimeout(() => setIsAnimating(false), 50);
            }, 200);
        }
    };

    const openModal = (project: any, event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
        
        const offsetX = centerX - viewportCenterX;
        const offsetY = centerY - viewportCenterY;
        
        setModalOrigin({
            x: offsetX,
            y: offsetY
        });
        
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    }

    useEffect(() => {
        if (selectedProject && modalRef.current && overlayRef.current && wrapperRef.current && contentRef.current) {
            const modal = modalRef.current;
            const overlay = overlayRef.current;
            const wrapper = wrapperRef.current;
            const content = contentRef.current;
            
            // Calculate position percentages
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            const originXPercent = ((modalOrigin.x + viewportWidth / 2) / viewportWidth) * 100;
            const originYPercent = ((modalOrigin.y + viewportHeight / 2) / viewportHeight) * 100;
            
            // Start: Small scale at origin with rounded corners
            gsap.set(modal, {
                scale: 0.05,
                x: modalOrigin.x,
                y: modalOrigin.y,
                opacity: 1,
                borderRadius: '16px'
            });
            
            gsap.set(wrapper, {
                scaleY: 0.1,
                scaleX: 0.8,
                transformOrigin: `${originXPercent}% ${originYPercent}%`
            });
            
            // Hide content initially
            gsap.set(content, {
                opacity: 0,
                y: 20
            });
            
            gsap.set(overlay, {
                opacity: 0
            });
            
            // Genie effect with smooth rounded corners
            const tl = gsap.timeline();
            
            tl.to(overlay, {
                opacity: 1,
                duration: 0.2,
                ease: "none"
            })
            // Step 1: Start expanding from origin
            .to(wrapper, {
                scaleY: 0.4,
                scaleX: 0.6,
                duration: 0.18,
                ease: "power1.in"
            }, 0.1)
            .to(modal, {
                scale: 0.3,
                x: modalOrigin.x * 0.5,
                y: modalOrigin.y * 0.5,
                duration: 0.18,
                ease: "power1.in"
            }, 0.1)
            // Step 2: Continue expanding
            .to(wrapper, {
                scaleY: 0.7,
                scaleX: 0.85,
                duration: 0.18,
                ease: "sine.inOut"
            })
            .to(modal, {
                scale: 0.6,
                x: modalOrigin.x * 0.3,
                y: modalOrigin.y * 0.3,
                duration: 0.18,
                ease: "sine.inOut"
            }, "<")
            // Step 3: Almost full size
            .to(wrapper, {
                scaleY: 0.95,
                scaleX: 0.95,
                duration: 0.16,
                ease: "sine.out"
            })
            .to(modal, {
                scale: 0.85,
                x: 0,
                y: 0,
                duration: 0.16,
                ease: "sine.out"
            }, "<")
            // Step 4: Full size with rounded corners maintained
            .to(wrapper, {
                scaleY: 1,
                scaleX: 1,
                duration: 0.14,
                ease: "power2.out"
            })
            .to(modal, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.14,
                ease: "power2.out"
            }, "<")
            // AFTER modal is fully open, fade in content
            .to(content, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            }, "+=0.1");
        }
    }, [selectedProject, modalOrigin]);

    const closeModal = () => {
        if (modalRef.current && overlayRef.current && wrapperRef.current && contentRef.current) {
            const modal = modalRef.current;
            const overlay = overlayRef.current;
            const wrapper = wrapperRef.current;
            const content = contentRef.current;
            
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            const originXPercent = ((modalOrigin.x + viewportWidth / 2) / viewportWidth) * 100;
            const originYPercent = ((modalOrigin.y + viewportHeight / 2) / viewportHeight) * 100;
            
            const tl = gsap.timeline({
                onComplete: () => {
                    setSelectedProject(null);
                    document.body.style.overflow = 'auto';
                }
            });
            
            // FIRST: Fade out content
            tl.to(content, {
                opacity: 0,
                y: -20,
                duration: 0.25,
                ease: "power2.in"
            })
            // THEN: Start modal closing animation with scale
            .to(wrapper, {
                scaleY: 0.95,
                scaleX: 0.95,
                duration: 0.14,
                ease: "power2.in"
            }, "+=0.1")
            .to(modal, {
                scale: 0.85,
                x: 0,
                y: 0,
                borderRadius: '16px',
                duration: 0.14,
                ease: "power2.in"
            }, "<")
            .to(wrapper, {
                scaleY: 0.7,
                scaleX: 0.85,
                duration: 0.16,
                ease: "sine.in"
            })
            .to(modal, {
                scale: 0.6,
                x: modalOrigin.x * 0.3,
                y: modalOrigin.y * 0.3,
                duration: 0.16,
                ease: "sine.in"
            }, "<")
            .to(wrapper, {
                scaleY: 0.4,
                scaleX: 0.6,
                duration: 0.18,
                ease: "sine.inOut"
            })
            .to(modal, {
                scale: 0.3,
                x: modalOrigin.x * 0.5,
                y: modalOrigin.y * 0.5,
                duration: 0.18,
                ease: "sine.inOut"
            }, "<")
            .to(wrapper, {
                scaleY: 0.1,
                scaleX: 0.8,
                duration: 0.18,
                ease: "power1.out"
            })
            .to(modal, {
                scale: 0.05,
                x: modalOrigin.x,
                y: modalOrigin.y,
                duration: 0.18,
                ease: "power1.out"
            }, "<")
            .to(overlay, {
                opacity: 0,
                duration: 0.2,
                ease: "none"
            }, "-=0.15");
        }
    }

    return (
        <section className={style.projectsSection}>
            <div className={style.container}>
                <div className={style.header}>
                    <span className={style.ourWorks}>Projects</span>
                    <h2>Our Projects</h2>
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
                    {filteredProjects.map((project, index) => (
                        <div 
                            key={project.id}
                            onClick={(e) => openModal(project, e)}
                            className={style.projectCard}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div className={style.imageContainer}>
                                <Image src={project.image} alt={project.title} width={500} height={300} />
                                <div className={style.overlay}>
                                    <h3>{project.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Modal */}
                {selectedProject && (
                    <div ref={overlayRef} className={style.modalOverlay} onClick={closeModal}>
                        <div ref={wrapperRef} className={style.modalWrapper}>
                            <div 
                                ref={modalRef}
                                className={style.modalContent} 
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div ref={contentRef} className={style.modalContentInner}>
                                    <button className={style.closeBtn} onClick={closeModal}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </button>
                                    <Image className={style.modalImage} src={selectedProject.image} alt={selectedProject.title} width={500} height={300} />
                                    <h3>{selectedProject.title}</h3>
                                    <p>{selectedProject.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};