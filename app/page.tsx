import Image from "next/image";
import "../components/Hero/hero.module.css";

export default function Home() {
  return (
              <a
            className="absolute bottom-0 right-0 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/ms1317s-projects"
            target="_blank"
            rel="noopener noreferrer"
            >
              <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
  );
}
