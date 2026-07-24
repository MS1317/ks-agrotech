import { createClient } from '../../lib/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch summary counts for the dashboard
  const [{ count: faqCount }, { count: testimonialCount }, { count: serviceCount }, { count: productCount }, { count: queryCount }] = await Promise.all([
    supabase.from('faqs').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('contact_queries').select('*', { count: 'exact', head: true }),
  ]);

  // Fetch 5 most recent contact queries
  const { data: recentQueries } = await supabase
    .from('contact_queries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = [
    { name: 'Total Products', value: productCount || 0, href: '/admin/products' },
    { name: 'Total FAQs', value: faqCount || 0, href: '/admin/faqs' },
    { name: 'Total Testimonials', value: testimonialCount || 0, href: '/admin/testimonials' },
    { name: 'Total Services', value: serviceCount || 0, href: '/admin/services' },
    { name: 'Contact Queries', value: queryCount || 0, href: '/admin/contact-queries' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to the KS Agrotech admin panel. Manage your website content and view recent contact queries.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1 w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="space-y-1">
                      <div className="text-3xl font-semibold text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href={item.href} className="font-medium text-blue-600 hover:text-blue-900">
                  View all
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Contact Queries</h3>
          <Link href="/admin/contact-queries" className="text-sm text-blue-600 hover:text-blue-900 font-medium">
            View all queries &rarr;
          </Link>
        </div>
        <div className="px-4 py-5 sm:p-0">
          {recentQueries && recentQueries.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentQueries.map((query) => (
                <div key={query.id} className="py-4 px-6 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {query.first_name} {query.last_name}
                      </p>
                      <p className="text-sm text-gray-500">{query.email}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(query.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {query.message && (
                    <p className="mt-2 text-sm text-gray-600 truncate max-w-2xl">{query.message}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 text-sm">
              No recent contact queries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
