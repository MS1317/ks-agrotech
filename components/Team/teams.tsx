import React from "react";
import style from "./teams.module.css";

const teamsArray=[
    {
        name: "Rory Burns",
        designation: "Chief Engineer",
        img: <img src={"../images/Home/Team/T7.jpg"} alt="Support Center" />,
        phone: "+123456789",
        email:  "rory.burns@example.com"
    },
    {
        name: "Bernie Kowalczyk",
        designation: "Engineer",
        img: <img src={"../images/Home/Team/T7.jpg"} alt="Rebuild" />,
        phone: "+123456789",
        email:  "rory.burns@example.com"     
    },
    {
        name: "Tryphena Roberts",
        designation: "Engineer",
        img: <img src={"../images/Home/Team/T7.jpg"} alt="Efficiency Upgrade" />,
        phone: "+123456789",
        email:  "rory.burns@example.com"
    },
    {
        name: "Arlo Norwood",
        designation: "Engineer",
        img: <img src={"../images/Home/Team/T7.jpg"} alt="Efficiency Upgrade" />,
        phone: "+123456789",
        email:  "rory.burns@example.com"
    },
]

export default function Teams(){
    return(
        <section className="teams-sec container-fluid">
            <div className={`${style["teams-container"]} container mx-auto`}>
                <div className={`${style.info}`}>
                    <h6 className="font-semibold text-center">Our Team</h6>
                    <h2 className="font-bold text-center">Many Years Experience</h2>
                </div>

                <div className="teams flex flex-row flex-wrap justify-center">
                    {teamsArray.map((team,index)=>{
                        return (
                            <div key={index} className={style.teamBox}>
                                <div className={`${style.teamMemberOverlay} aspect-square mb-7.5`}>
                                    <img className="object-cover " src={team.img.props.src} alt={team.img.props.alt} />
                                    {team.phone || team.email ? (
                                        <>
                                            <div className={style.contactProfiles}>
                                                <div className={style.phone}>
                                                    <a href={`tel:+${team.phone}`}>
                                                        <img src={"../images/Home/Team/phone.png"} alt="Phone" />
                                                    </a>
                                                </div>

                                                <div className={style.email}>
                                                    <a href={`mailto:${team.email}`}>
                                                        <img src={"../images/Home/Team/gmail.png"} alt="Email" />
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    ):(<></>)}
                                </div>
                                <div className={`${style.teamInfo} text-center`}>
                                    <div>
                                        <h6>{team.name}</h6>
                                        <p>{team.designation}</p>
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