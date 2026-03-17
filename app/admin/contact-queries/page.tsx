'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { Trash2 } from 'lucide-react';

interface ContactQuery {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function ContactQueriesManagement() {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('contact_queries').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching queries:", error);
        alert("Failed to load queries. See console for details.");
      }
      if (data) setQueries(data);
    } catch (err) {
      console.error("Unexpected error fetching queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this query?')) {
      try {
        const { error } = await supabase.from('contact_queries').delete().eq('id', id);
        if (error) throw error;
        fetchQueries();
      } catch (err) {
        console.error("Error deleting query:", err);
        alert("Failed to delete query.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Contact Queries</h1>
        <p className="mt-2 text-sm text-gray-500">
          Messages submitted from the contact form. Queries are automatically deleted after 45 days.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading Queries...</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {queries.length === 0 ? (
              <li className="px-6 py-10 text-center text-gray-500">No recent contact queries found.</li>
            ) : (
              queries.map((query) => (
                <li key={query.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                        {query.first_name[0]}{query.last_name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {query.first_name} {query.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          <a href={`mailto:${query.email}`} className="text-blue-600 hover:underline">
                            {query.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {new Date(query.created_at).toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleDelete(query.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {query.message && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border border-gray-100 shadow-inner">
                      {query.message}
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
