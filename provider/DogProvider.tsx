import React, { createContext, useContext, useState, useEffect } from 'react';
import { Breed, DogContextType } from '../types/dog';
import { fetchDogBreeds } from '../services/dogApi';

const DogContext = createContext<DogContextType | undefined>(undefined);

const PAGE_SIZE = 10;

export const DogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [favorites, setFavorites] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadPage = async (page: number, replaceBreeds: boolean) => {
    try {
      if (replaceBreeds) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError(null);

      const response = await fetchDogBreeds(page, PAGE_SIZE);

      setBreeds((previousBreeds) =>
        replaceBreeds ? response.data : [...previousBreeds, ...response.data]
      );
      setCurrentPage(response.meta.pagination.current);
      setTotalPages(response.meta.pagination.last);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error in DogProvider:', errorMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchBreeds = async () => {
    setBreeds([]);
    setCurrentPage(0);
    setTotalPages(0);
    await loadPage(1, true);
  };

  const loadMoreBreeds = async () => {
    if (loading || loadingMore || currentPage >= totalPages) {
      return;
    }

    await loadPage(currentPage + 1, false);
  };

  const toggleFavorite = (breed: Breed) => {
    setFavorites((previousFavorites) => {
      const isAlreadyFavorite = previousFavorites.some((item) => item.id === breed.id);

      if (isAlreadyFavorite) {
        return previousFavorites.filter((item) => item.id !== breed.id);
      }

      return [...previousFavorites, breed];
    });
  };

  const isFavorite = (breedId: string) =>
    favorites.some((breed) => breed.id === breedId);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const value: DogContextType = {
    breeds,
    favorites,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    fetchBreeds,
    loadMoreBreeds,
    toggleFavorite,
    isFavorite,
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
