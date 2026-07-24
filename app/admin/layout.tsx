'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import { Home, HelpCircle, MessageSquare, Briefcase, Mail, LogOut, Package } from 'lucide-react';
import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ['300', '400', '700'],
});

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Contact Queries', href: '/admin/contact-queries', icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={`${merriweather.variable} font-merriweather min-h-screen bg-gray-50`}>
      <main className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col bg-slate-900 border-r border-slate-800">
          <div className="flex flex-col flex-1 min-h-0 pt-5">
            <div className="px-4">
              <h1 className="text-2xl font-bold text-white font-merriweather tracking-widest">KS AGROTECH</h1>
            </div>
            <div className="flex-1 px-2 mt-6 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-2 py-2 rounded-md text-sm font-medium ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex-shrink-0 px-2 py-4 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-red-300 hover:bg-red-800 hover:text-white"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - horizontal scroll */}
        <div className="bg-slate-900 overflow-x-auto flex md:hidden">
          <nav className="flex px-4 py-2 space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap text-sm ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}