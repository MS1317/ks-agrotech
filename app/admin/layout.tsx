'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import { Home, HelpCircle, MessageSquare, Briefcase, Mail, LogOut, Package } from 'lucide-react';

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
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900 border-none m-0 p-0 antialiased">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col hidden md:flex min-h-screen">
        <div className="h-16 flex items-center px-6 bg-slate-950 font-bold text-xl tracking-wider">
          KS AGROTECH
        </div>
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Menu
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2.5 rounded-md text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-100">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 md:hidden">
          <div className="font-bold text-lg text-slate-900">KS AGROTECH</div>
          <button onClick={handleLogout} className="text-sm font-medium text-red-600">Logout</button>
        </header>

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
