export interface BreedAttributes {
  name: string;
  description: string;
  life: {
    max: number;
    min: number;
  };
  male_weight: {
    max: number;
    min: number;
  };
  female_weight: {
    max: number;
    min: number;
  };
  hypoallergenic: boolean;
}

export interface Breed {
  id: string;
  type: string;
  attributes: BreedAttributes;
  relationships: {
    group: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface DogApiResponse {
  data: Breed[];
  meta: {
    pagination: {
      current: number;
      next: number;
      last: number;
      records: number;
    };
  };
  links: {
    self: string;
    current: string;
    next: string;
    last: string;
  };
}

export interface DogContextType {
  breeds: Breed[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  fetchBreeds: () => Promise<void>;
  loadMoreBreeds: () => Promise<void>;
}
