'use client';
import { usePathname } from 'next/navigation';  
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';
import Image from "next/image";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUnderConstruction = pathname === '/under-construction';
  console.log(pathname);

  return (
    <>
      {!isUnderConstruction && <Header />}
      {children} {/* 👈 this is the magic sauce */}
      {!isUnderConstruction && <Footer />}
      {process.env.NODE_ENV === "development" && (
      <a className="fixed bottom-0 right-0 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto" href="https://vercel.com/ms1317s-projects" target="_blank" rel="noopener noreferrer">
        <Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
          Deploy now
      </a>
      )}
    </>
  );
}
