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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 sweet-card">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{sweet.name}</h3>
          <span className="bg-primary-light bg-opacity-20 text-primary-dark px-2 py-1 rounded-full text-xs font-medium">
            {sweet.category}
          </span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">Price: ₹{sweet.price}</p>
            <p className="text-gray-600 text-sm">Quantity: {sweet.quantity}</p>
          </div>

          <div className="flex items-center gap-3">
            {showPurchase && (
              <button
                onClick={handlePurchase}
                disabled={sweet.quantity === 0 || purchasing}
                className={`px-3 py-1 rounded-md text-white ${sweet.quantity === 0 || purchasing ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {purchasing ? 'Purchasing...' : 'Purchase'}
              </button>
            )}
            {canEdit && (
              <>
                <button
                  onClick={() => onEdit && onEdit(sweet)}
                  className="text-primary-dark hover:text-primary-light transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete && onDelete(sweet.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 100 2h.293l1.3 9.102A2 2 0 007.58 17h4.84a2 2 0 001.987-1.898L15.707 6H16a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM8 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweetCard;