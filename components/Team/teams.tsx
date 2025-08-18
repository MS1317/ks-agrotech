import React from "react";
import style from "./teams.module.css";
import Image from "next/image";

const teamsArray = [
    {
        name: "Rory Burns",
        designation: "Chief Engineer",
        img: "/images/Home/Team/T7.jpg",
        phone: "+123456789",
        email: "rory.burns@example.com"
    },
    {
        name: "Bernie Kowalczyk",
        designation: "Engineer",
        img: "/images/Home/Team/T7.jpg",
        phone: "+123456789",
        email: "bernie.kowalczyk@example.com"
    },
    {
        name: "Tryphena Roberts",
        designation: "Engineer",
        img: "/images/Home/Team/T7.jpg",
        phone: "+123456789",
        email: "tryphena.roberts@example.com"
    },
    {
        name: "Arlo Norwood",
        designation: "Engineer",
        img: "/images/Home/Team/T7.jpg",
        phone: "+123456789",
        email: "arlo.norwood@example.com"
    },
];

export default function Teams() {
    return (
        <section className={`${style.teamsSection} container-fluid`}>
            <div className={`${style.teamsContainer} container mx-auto`}>
                <div className={style.info}>
                    <h6 className="font-semibold text-center">Our Mechanical Engine</h6>
                    <h2 className="font-bold text-center">Many Years Experience</h2>
                </div>

                <div className={`${style.teamsGrid} flex flex-row flex-wrap justify-center`}>
                    {teamsArray.map((team, index) => {
                        return (
                            <div key={index} className={style.teamBox}>
                                <div className={`${style.teamMemberOverlay} aspect-square`}>
                                    <Image
                                        className={style.teamImage}
                                        src={team.img}
                                        alt={team.name}
                                        width={500}
                                        height={500}
                                    />
                                    <div className={style.overlay}>
                                        <div className={style.contactProfiles}>
                                            {team.phone && (
                                                <div className={style.contactItem}>
                                                    <a href={`tel:${team.phone}`}>
                                                        <Image src="/images/Home/Team/phone.png" alt="Phone" />
                                                    </a>
                                                </div>
                                            )}
                                            {team.email && (
                                                <div className={style.contactItem}>
                                                    <a href={`mailto:${team.email}`}>
                                                        <Image src="/images/Home/Team/gmail.png" alt="Email" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${style.teamInfo} text-center`}>
                                    <h6>{team.name}</h6>
                                    <p>{team.designation}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}