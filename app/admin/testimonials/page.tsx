'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  text: string;
  author: string;
  position: string;
  image_url: string;
  sort_order: number;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ text: '', author: '', position: '', image_url: '', sort_order: 0 });
  const supabase = createClient();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
      if (error) {
        console.error("Error fetching testimonials:", error);
        alert("Failed to load testimonials. See console for details.");
      }
      if (data) setTestimonials(data);
    } catch (err) {
      console.error("Unexpected error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({
        text: testimonial.text,
        author: testimonial.author,
        position: testimonial.position,
        image_url: testimonial.image_url,
        sort_order: testimonial.sort_order
      });
    } else {
      setEditingId(null);
      setFormData({ text: '', author: '', position: '', image_url: '', sort_order: testimonials.length });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ text: '', author: '', position: '', image_url: '', sort_order: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase.from('testimonials').update(formData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('testimonials').insert([formData]);
        if (error) throw error;
      }
      handleCloseModal();
      fetchTestimonials();
    } catch (err) {
      console.error("Error saving testimonial:", err);
      alert("Failed to save testimonial.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) throw error;
        fetchTestimonials();
      } catch (err) {
        console.error("Error deleting testimonial:", err);
        alert("Failed to delete testimonial.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Manage Testimonials</h1>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading Testimonials...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.length === 0 ? (
            <div className="col-span-full py-10 text-center rounded-lg border-2 border-dashed border-gray-300">
              <span className="text-gray-500">No testimonials found. Click "Add Testimonial" to create one.</span>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
                <div className="p-5 flex-1 flex flex-col items-center text-center">
                  <div className="h-20 w-20 relative rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                    <Image
                      src={testimonial.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{testimonial.author}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">{testimonial.position}</p>
                  <p className="text-sm text-gray-500 italic flex-1">"{testimonial.text}"</p>
                  <p className="mt-4 text-xs text-gray-400">Sort Order: {testimonial.sort_order}</p>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between">
                  <button
                    onClick={() => handleOpenModal(testimonial)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
                  >
                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
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
                      {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h3>
                    <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author Name</label>
                      <input
                        type="text"
                        name="author"
                        id="author"
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position / Company</label>
                      <input
                        type="text"
                        name="position"
                        id="position"
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                      />
                    </div>
                    <div>
                      <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="text"
                        name="image_url"
                        id="image_url"
                        required
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div>
                      <label htmlFor="text" className="block text-sm font-medium text-gray-700">Testimonial Text</label>
                      <textarea
                        id="text"
                        name="text"
                        rows={4}
                        required
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingId ? 'Save Changes' : 'Add Testimonial'}
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
