import { DogApiResponse } from '../types/dog';

const API_BASE_URL = 'https://dogapi.dog/api/v2';
const PAGE_SIZE = 10;

export const fetchDogBreeds = async (
  page: number = 1,
  pageSize: number = PAGE_SIZE
): Promise<DogApiResponse> => {
  try {
    const url = `${API_BASE_URL}/breeds?page[number]=${page}&page[size]=${pageSize}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: DogApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    throw error;
  }
};
