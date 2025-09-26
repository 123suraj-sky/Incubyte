/**
 * Hook that encapsulates sweets data fetching and mutations.
 * Provides list, loading/error state, and helpers for CRUD/search/purchase.
 */
import { useState, useEffect } from 'react';
import { sweetsService } from '../services/api';

export const useSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load all sweets
  const fetchSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsService.getAll();
      setSweets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search by free-text name query
  const searchSweets = async (query) => {
    try {
      setLoading(true);
      setSearchQuery(query);
      const data = await sweetsService.search(query);
      setSweets(data);
      setError(null);
    } catch (err) {
      setError('Failed to search sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new sweet
  const addSweet = async (sweet) => {
    try {
      setLoading(true);
      await sweetsService.add(sweet);
      await fetchSweets();
      return true;
    } catch (err) {
      setError('Failed to add sweet');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing sweet
  const updateSweet = async (id, sweet) => {
    try {
      setLoading(true);
      await sweetsService.update(id, sweet);
      await fetchSweets();
      return true;
    } catch (err) {
      setError('Failed to update sweet');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete a sweet
  const deleteSweet = async (id) => {
    try {
      setLoading(true);
      await sweetsService.remove(id);
      await fetchSweets();
      return true;
    } catch (err) {
      setError('Failed to delete sweet');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Purchase a sweet and optimistically decrease local quantity
  const purchaseSweet = async (id) => {
    try {
      await sweetsService.purchase(id);
      setSweets(prev => prev.map(s => s.id === id ? { ...s, quantity: Math.max(0, (s.quantity || 0) - 1) } : s));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to purchase sweet');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return {
    sweets,
    loading,
    error,
    searchQuery,
    fetchSweets,
    searchSweets,
    addSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet
  };
};