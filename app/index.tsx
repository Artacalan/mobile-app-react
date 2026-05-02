import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { useDogs } from '../provider/DogProvider';
import { DogBreedCard } from '../components/DogBreedCard';
import { DogListHeader } from '../components/DogListHeader';
import { DogLoadingState } from '../components/DogLoadingState';
import { DogErrorState } from '../components/DogErrorState';
import { DogEmptyState } from '../components/DogEmptyState';
import { DogLoadingMoreFooter } from '../components/DogLoadingMoreFooter';

export default function Page() {
  const {
    breeds,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    fetchBreeds,
    loadMoreBreeds,
  } = useDogs();

  if (loading && breeds.length === 0) {
    return <DogLoadingState message="Loading dog breeds..." />;
  }

  if (error) {
    return <DogErrorState error={error} onRetry={fetchBreeds} />;
  }

  return (
    <View style={styles.container}>
      <DogListHeader currentPage={currentPage} totalPages={totalPages} />

      {(loading || loadingMore) && breeds.length > 0 && <DogLoadingMoreFooter loading />}

      <FlatList
        data={breeds}
        renderItem={({ item }) => <DogBreedCard breed={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={breeds.length === 0 && styles.emptyListContent}
        onEndReached={loadMoreBreeds}
        onEndReachedThreshold={0.4}
        ListFooterComponent={<DogLoadingMoreFooter loading={loadingMore} />}
        ListEmptyComponent={!loading ? <DogEmptyState /> : null}
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
