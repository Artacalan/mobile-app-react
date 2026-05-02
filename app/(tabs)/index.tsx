import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDogs } from '../../provider/DogProvider';
import { DogBreedCard } from '../../components/DogBreedCard';
import { DogListHeader } from '../../components/DogListHeader';
import { DogLoadingState } from '../../components/DogLoadingState';
import { DogErrorState } from '../../components/DogErrorState';
import { DogEmptyState } from '../../components/DogEmptyState';
import { DogLoadingMoreFooter } from '../../components/DogLoadingMoreFooter';
import { DogSearchBar } from '../../components/DogSearchBar';

export default function Page() {
  const [search, setSearch] = useState('');
  const {
    breeds,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    fetchBreeds,
    loadMoreBreeds,
    toggleFavorite,
    isFavorite,
  } = useDogs();

  const filteredBreeds = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return breeds;
    }

    return breeds.filter((breed) => {
      const name = breed.attributes.name.toLowerCase();
      const description = breed.attributes.description.toLowerCase();

      return name.includes(query) || description.includes(query);
    });
  }, [breeds, search]);

  if (loading && breeds.length === 0) {
    return <DogLoadingState message="Loading dog breeds..." />;
  }

  if (error) {
    return <DogErrorState error={error} onRetry={fetchBreeds} />;
  }

  return (
    <View style={styles.container}>
      <DogListHeader currentPage={currentPage} totalPages={totalPages} />
      <DogSearchBar value={search} onChangeText={setSearch} />

      {(loading || loadingMore) && breeds.length > 0 && <DogLoadingMoreFooter loading />}

      <FlatList
        data={filteredBreeds}
        renderItem={({ item }) => (
          <DogBreedCard
            breed={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={filteredBreeds.length === 0 && styles.emptyListContent}
        onEndReached={loadMoreBreeds}
        onEndReachedThreshold={0.4}
        ListFooterComponent={<DogLoadingMoreFooter loading={loadingMore} />}
        ListEmptyComponent={!loading ? <DogEmptyState message={search ? 'No matching dog breeds found.' : undefined} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginTop: 32,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
