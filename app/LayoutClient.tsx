'use client';
import { usePathname } from 'next/navigation';  
import Header from '../components/Header/Header';
import Hero from '../components/Hero/hero';
import Stats from '../components/Stats/stats';


export default function LayoutClient({ }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUnderConstruction = pathname === '/under-construction';

  return (
    <>
      {!isUnderConstruction && <Header />}
      {!isUnderConstruction && <Hero />}
      {!isUnderConstruction && <Stats />}
    </>
  );
}