'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { Plus, Edit2, Trash2, X, Upload, Copy } from 'lucide-react';
import Image from 'next/image';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  sort_order: number;
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', category: '', description: '', image_url: '', sort_order: 0 });
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').order('sort_order', { ascending: true });
      if (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products. See console for details.");
      }
      if (data) setProducts(data);
    } catch (err) {
      console.error("Unexpected error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        title: product.title,
        category: product.category,
        description: product.description,
        image_url: product.image_url,
        sort_order: product.sort_order
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', category: '', description: '', image_url: '', sort_order: products.length });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', category: '', description: '', image_url: '', sort_order: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase.from('products').update(formData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([formData]);
        if (error) throw error;
      }
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Check console.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      }
    }
  };

  const handleDuplicate = async (product: Product) => {
    try {
      const { error } = await supabase.from('products').insert([{
        title: `${product.title} (Copy)`,
        category: product.category,
        description: product.description,
        image_url: product.image_url,
        sort_order: products.length
      }]);
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error("Error duplicating product:", err);
      alert("Failed to duplicate product.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading Products...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 ? (
            <div className="col-span-full py-10 text-center rounded-lg border-2 border-dashed border-gray-300">
              <span className="text-gray-500">No products found. Click "Add Product" to create one.</span>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
                <div className="h-48 w-full relative bg-gray-200">
                  {product.image_url ? (
                    product.image_url.includes('cloudinary.com') ? (
                      <CldImage
                        src={product.image_url}
                        alt={product.title}
                        fill
                        className="object-cover"
                        crop="fill"
                        gravity="auto"
                      />
                    ) : (
                      <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                    )
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                    {product.category}
                  </div>
                </div>
                <div className="p-5 flex-1 mt-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <p className="text-xs text-gray-400">Sort Order: {product.sort_order}</p>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
                  >
                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDuplicate(product)}
                    className="text-green-600 hover:text-green-900 text-sm font-medium flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-1" /> Duplicate
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
                      {editingId ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                      <input
                        type="text"
                        name="category"
                        id="category"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1 flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                        placeholder="e.g. Grinding Machines"
                      />
                    </div>
                    <div>
                      <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                      <div className="space-y-3">
                        {formData.image_url && (
                          <div className="relative h-32 w-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                            {formData.image_url.includes('cloudinary.com') ? (
                               <CldImage 
                                 src={formData.image_url} 
                                 alt="Preview" 
                                 fill 
                                 className="object-cover"
                               />
                            ) : (
                              <Image 
                                src={formData.image_url} 
                                alt="Preview" 
                                fill 
                                className="object-cover"
                                unoptimized={!formData.image_url.startsWith('/')}
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, image_url: '' })}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition shadow-sm"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <CldUploadWidget 
                            uploadPreset="ks-agrotech" // You need to update this to your actual preset name
                            onSuccess={(result) => {
                              if (typeof result.info !== 'string' && result.info?.secure_url) {
                                setFormData({ ...formData, image_url: result.info.secure_url });
                              }
                            }}
                          >
                            {({ open }) => (
                              <button
                                type="button"
                                onClick={() => open()}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                {formData.image_url ? 'Change Image' : 'Upload Image'}
                              </button>
                            )}
                          </CldUploadWidget>
                          
                          <input
                            type="text"
                            name="image_url"
                            id="image_url"
                            required
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="flex-1 block w-full border border-gray-300 rounded-md sm:text-sm px-3 py-2 text-black bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10"
                            placeholder="Or paste image URL..."
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Tip: Use the upload button for Cloudinary or paste a direct URL.
                        </p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                    {editingId ? 'Save Changes' : 'Add Product'}
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
