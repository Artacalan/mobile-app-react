import { FlatList, StyleSheet, View } from 'react-native';
import { useDogs } from '../../provider/DogProvider';
import { DogBreedCard } from '../../components/DogBreedCard';
import { DogEmptyState } from '../../components/DogEmptyState';
import { DogFavoritesHeader } from '../../components/DogFavoritesHeader';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useDogs();

  return (
    <View style={styles.container}>
      <DogFavoritesHeader count={favorites.length} />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DogBreedCard
            breed={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        )}
        contentContainerStyle={favorites.length === 0 && styles.emptyListContent}
        ListEmptyComponent={<DogEmptyState message="No favorites yet. Tap the star on a breed card to save it here." />}
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
