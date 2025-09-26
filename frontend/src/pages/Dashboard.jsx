import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSweets } from '../hooks/useSweets';
import Header from '../components/Header';
import SweetCard from '../components/SweetCard';
import SweetModal from '../components/SweetModal';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { sweets, loading, error, searchSweets, addSweet, updateSweet, deleteSweet, purchaseSweet } = useSweets();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(null);

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleOpenModal = (sweet = null) => {
    setCurrentSweet(sweet);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentSweet(null);
  };

  const handleSaveSweet = async (id, sweetData) => {
    let success;
    
    if (id) {
      success = await updateSweet(id, sweetData);
    } else {
      success = await addSweet(sweetData);
    }
    
    if (success) {
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sweet Shop Inventory</h1>
          {user?.is_admin && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-gradient-to-r from-primary-light to-primary-dark text-white px-4 py-2 rounded-md hover:from-primary-dark hover:to-primary-light transition-all"
            >
              Add New Sweet
            </button>
          )}
        </div>
        
        <SearchFilters onSearch={searchSweets} />
        
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.length > 0 ? (
              sweets.map(sweet => (
                <SweetCard
                  key={sweet.id}
                  sweet={sweet}
                  canEdit={!!user?.is_admin}
                  showPurchase={!user?.is_admin}
                  onEdit={handleOpenModal}
                  onDelete={async (id) => { await deleteSweet(id); }}
                  onPurchase={async (id) => { await purchaseSweet(id); }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No sweets found. Add some to get started!
              </div>
            )}
          </div>
        )}
      </main>
      
      {modalOpen && (
        <SweetModal
          sweet={currentSweet}
          onClose={handleCloseModal}
          onSave={handleSaveSweet}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Dashboard;