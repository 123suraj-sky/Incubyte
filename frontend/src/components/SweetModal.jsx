/**
 * SweetModal provides a form to create or edit a sweet.
 *
 * @param {Object} props
 * @param {{id?:string,name?:string,category?:string,price?:number,quantity?:number}} [props.sweet]
 * @param {() => void} props.onClose
 * @param {(id:string|undefined, data:Object) => Promise<void>} props.onSave
 * @param {boolean} props.loading
 */
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const SweetModal = ({ sweet, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || '',
        category: sweet.category || '',
        price: sweet.price || '',
        quantity: sweet.quantity || ''
      });
    }
  }, [sweet]);

  // Mirror form inputs into local component state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Coerce number fields and submit to parent handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const sweetData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity)
    };
    onSave(sweet?.id, sweetData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 slide-in">
      <div className="glass-card bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 m-4 bounce-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sweet ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
              </svg>
            </div>
            {sweet ? 'Edit Sweet' : 'Add New Sweet'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2" htmlFor="name">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
                placeholder="Enter sweet name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2" htmlFor="category">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Category
            </label>
            <div className="relative">
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
                placeholder="e.g., Chocolate, Candy, Cake"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2" htmlFor="price">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Price (₹)
            </label>
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2" htmlFor="quantity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Quantity
            </label>
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-light to-primary-dark rounded-xl hover:from-primary-dark hover:to-primary-light focus:outline-none focus:ring-4 focus:ring-primary-light focus:ring-opacity-30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner size="sm" /> : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SweetModal;