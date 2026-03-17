'use client';

import Hero from '../components/Hero/hero';
import Stats from '../components/Stats/stats';
import Services from '../components/Services/services';
import CTA from '../components/CTA/cta';
import Teams from '../components/Team/teams';
import { FAQ } from '../components/FAQ/faq';
import { Products } from '../components/Products/products';
import { CTA2 } from '../components/CTA2/cta2';
import Process from '../components/Process/process';
import Testimonial from '../components/Testimonial/testimonial';

export default function Home() {
  return (
          <>
          <Hero />
          <Stats />
          <Services />
          <CTA />
          <Teams />
          <FAQ />
          <Products />
          <CTA2 />
          <Process />
          <Testimonial />
        </>
  );
}
