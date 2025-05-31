'use client';
import { usePathname } from 'next/navigation';  
import Header from '../components/Header/Header';
import Hero from '../components/Hero/hero';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUnderConstruction = pathname === '/under-construction';

  return (
    <>
      {!isUnderConstruction && <Header />}
      {!isUnderConstruction && <Hero />}
      {children}
    </>
  );
}