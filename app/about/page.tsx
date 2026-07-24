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
          title: "OUR STORY",
          text: "K.S. Agrotech has established itself as a formidable manufacturer in Sahnewal, Punjab, since October 7, 2024. Our expertise lies in crafting a wide array of agricultural pulleys, ensuring exceptional performance and durability."
        },
        {
          title: "OUR PRODUCTS",
          text: "We specialize in manufacturing V belt pulleys, thresher pulleys, reaper pulleys, combine pulleys, bush type pulleys, cam pulleys, and mudloader pulleys. Each product exemplifies precision engineering."
        },
        {
          title: "OUR COMMITMENT",
          text: "Our dedication to delivering quality solutions sets us apart in the industry. We ensure exceptional performance and durability in demanding agricultural applications."
        }
    ]}/>

    <Stats />
    <Teams />
    <Testimonial />
  </>
  )
}
