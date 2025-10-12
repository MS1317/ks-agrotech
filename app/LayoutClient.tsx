'use client';
import { usePathname } from 'next/navigation';  
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUnderConstruction = pathname === '/under-construction';
  console.log(pathname);

  return (
    <>
      {!isUnderConstruction && <Header />}
      {children} {/* 👈 this is the magic sauce */}
      {!isUnderConstruction && <Footer />}
    </>
  );
}
