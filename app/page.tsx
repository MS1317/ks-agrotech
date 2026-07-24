'use client';

import dynamic from 'next/dynamic';
import Hero from '../components/Hero/hero';
import AboutHeader from '../components/Aboutheader/aboutHeader';

const Stats = dynamic(() => import('../components/Stats/stats'), { ssr: false });
const Services = dynamic(() => import('../components/Services/services'), { ssr: false });
const CTA = dynamic(() => import('../components/CTA/cta'), { ssr: false });
const Teams = dynamic(() => import('../components/Team/teams'), { ssr: false });
const FAQ = dynamic(() => import('../components/FAQ/faq').then(mod => mod.FAQ), { ssr: false });
const Products = dynamic(() => import('../components/Products/products').then(mod => mod.Products), { ssr: false });
const CTA2 = dynamic(() => import('../components/CTA2/cta2').then(mod => mod.CTA2), { ssr: false });
const Process = dynamic(() => import('../components/Process/process'), { ssr: false });
const Testimonial = dynamic(() => import('../components/Testimonial/testimonial'), { ssr: false });

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutHeader sections={[
        { title: "Our Legacy", text: "K.S. Agrotech has been a pioneer in manufacturing agricultural pulleys with decades of excellence." },
        { title: "Our Mission", text: "To provide the highest quality V belt and agriculture pulleys to enhance machinery performance." }
      ]} />
      <Services />
      <CTA />
      <Products />
      <Teams />
      <FAQ />
      <CTA2 />
      <Process />
      <Testimonial />
    </>
  );
}
