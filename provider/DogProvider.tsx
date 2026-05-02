import React, { createContext, useContext, useState, useEffect } from 'react';
import { Breed, DogContextType } from '../types/dog';
import { fetchDogBreeds } from '../services/dogApi';

const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBreeds = async (page: number = 1, pageSize: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchDogBreeds(page, pageSize);
      setBreeds(response.data);
      setCurrentPage(response.meta.pagination.current);
      setTotalPages(response.meta.pagination.last);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error in DogProvider:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Charge les races au montage du provider
  useEffect(() => {
    fetchBreeds();
  }, []);

  const value: DogContextType = {
    breeds,
    loading,
    error,
    currentPage,
    totalPages,
    fetchBreeds,
  };

  return <DogContext.Provider value={value}>{children}</DogContext.Provider>;
};

export const useDogs = (): DogContextType => {
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error('useDogs must be used within a DogProvider');
  }
  return context;
};
