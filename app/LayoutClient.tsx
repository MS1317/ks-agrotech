'use client';
import { usePathname } from 'next/navigation';  
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';
import WhatsappButton from '../components/WhatsAppButton/WhatsappButton';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUnderConstruction = pathname === '/under-construction';
  const isAdminRoute = pathname?.startsWith('/admin');
  
  const showHeaderFooter = !isUnderConstruction && !isAdminRoute;

  return (
    <>
      {showHeaderFooter && <Header />}
      {children} {/* 👈 this is the magic sauce */}
      {showHeaderFooter && <Footer />}
      <WhatsappButton />
    </>
  );
}
