/**
 * SweetCard displays a single sweet item with optional actions.
 *
 * @param {Object} props
 * @param {{id:string,name:string,category:string,price:number,quantity:number}} props.sweet
 * @param {boolean} [props.canEdit=false] - Show edit/delete actions.
 * @param {boolean} [props.showPurchase=true] - Show purchase action.
 * @param {(sweet:any)=>void} [props.onEdit]
 * @param {(id:string)=>void} [props.onDelete]
 * @param {(id:string)=>Promise<void>} [props.onPurchase]
 */
import React from 'react';

const SweetCard = ({ sweet, canEdit = false, showPurchase = true, onEdit, onDelete, onPurchase }) => {
  const [purchasing, setPurchasing] = React.useState(false);

  // Handle purchase action with client-side disabled state
  const handlePurchase = async () => {
    if (!onPurchase || purchasing || sweet.quantity === 0) return;
    setPurchasing(true);
    await onPurchase(sweet.id);
    setPurchasing(false);
  };

  // Get category gradient based on category
  const getCategoryGradient = (category) => {
    const gradients = {
      'Chocolate': 'bg-gradient-to-r from-amber-400 to-orange-500',
      'Candy': 'bg-gradient-to-r from-pink-400 to-rose-500',
      'Cake': 'bg-gradient-to-r from-purple-400 to-indigo-500',
      'Cookie': 'bg-gradient-to-r from-green-400 to-emerald-500',
      'Ice Cream': 'bg-gradient-to-r from-blue-400 to-cyan-500',
    };
    return gradients[category] || 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden sweet-card fade-in">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {sweet.name}
          </h3>
          <span className={`${getCategoryGradient(sweet.category)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
            {sweet.category}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-medium">₹{sweet.price}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="font-medium">{sweet.quantity} available</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showPurchase && (
              <button
                onClick={handlePurchase}
                disabled={sweet.quantity === 0 || purchasing}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 flex items-center gap-2 ${
                  sweet.quantity === 0 || purchasing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 18m2-5H9m0 0l-.4-2M9 13l.4 2" />
                </svg>
                {purchasing ? 'Purchasing...' : 'Purchase'}
              </button>
            )}
          </div>

          {canEdit && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit && onEdit(sweet)}
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-all duration-300 transform hover:scale-110"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete && onDelete(sweet.id)}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-all duration-300 transform hover:scale-110"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;