'use client';

import AboutHeader from "../../components/Aboutheader/aboutHeader";
import Stats from "../../components/Stats/stats";
import Teams from "../../components/Team/teams";
import Testimonial from "../../components/Testimonial/testimonial";

export default function AboutPage() {
  return (
    <>
      <AboutHeader sections={[
        {
          title: "COMPANY HISTORY",
        text: "We started in 2010 with a mission to build scalable digital solutions..."
      },
      {
        title: "HOW WE WORK",
        text: "We believe in transparency, agile processes, and client-first delivery..."
      },
      {
        title: "OUR VISION",
        text: "To become a global leader in tech innovation and solutions."
      }
    ]}/>

    <Stats />
    <Teams />
    <Testimonial />
  </>
  )
}
