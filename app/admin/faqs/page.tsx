'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { Plus, Edit2, Trash2, X, Copy } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export default function FAQsManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '', sort_order: 0 });
  const supabase = createClient();

  useEffect(() => {
    fetchFaqs();
  }, [supabase]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
      if (error) {
        console.error("Error fetching FAQs:", error);
        alert("Failed to load FAQs. See console for details.");
      }
      if (data) setFaqs(data);
    } catch (err) {
      console.error("Unexpected error fetching FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setEditingId(faq.id);
      setFormData({ question: faq.question, answer: faq.answer, sort_order: faq.sort_order });
    } else {
      setEditingId(null);
      setFormData({ question: '', answer: '', sort_order: faqs.length });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ question: '', answer: '', sort_order: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase.from('faqs').update(formData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('faqs').insert([formData]);
        if (error) throw error;
      }
      handleCloseModal();
      fetchFaqs();
    } catch (err) {
      console.error("Error saving FAQ:", err);
      alert("Failed to save FAQ.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        const { error } = await supabase.from('faqs').delete().eq('id', id);
        if (error) throw error;
        fetchFaqs();
      } catch (err) {
        console.error("Error deleting FAQ:", err);
        alert("Failed to delete FAQ.");
      }
    }
  };

  const handleDuplicate = async (faq: FAQ) => {
    try {
      const { error } = await supabase.from('faqs').insert([{
        question: `${faq.question} (Copy)`,
        answer: faq.answer,
        sort_order: faqs.length
      }]);
      if (error) throw error;
      fetchFaqs();
    } catch (err) {
      console.error("Error duplicating FAQ:", err);
      alert("Failed to duplicate FAQ.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Manage FAQs</h1>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading FAQs...</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {faqs.length === 0 ? (
              <li className="px-6 py-10 text-center text-gray-500">No FAQs found. Click &quot;Add FAQ&quot; to create one.</li>
            ) : (
              faqs.map((faq) => (
                <li key={faq.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-lg font-medium text-blue-600 truncate">{faq.question}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
                    <div className="mt-2 text-xs text-gray-400">Sort Order: {faq.sort_order}</div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    <button
                      onClick={() => handleOpenModal(faq)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(faq)}
                      className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingId ? 'Edit FAQ' : 'Add New FAQ'}
                    </h3>
                    <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                      <input
                        type="text"
                        name="question"
                        id="question"
                        required
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                      />
                    </div>
                    <div>
                      <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
                      <textarea
                        id="answer"
                        name="answer"
                        rows={4}
                        required
                        value={formData.answer}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">Sort Order</label>
                      <input
                        type="number"
                        name="sort_order"
                        id="sort_order"
                        value={formData.sort_order}
                        onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                      />
                      <p className="text-xs text-gray-500 mt-1">Lower numbers appear first on the website.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingId ? 'Save Changes' : 'Add FAQ'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
