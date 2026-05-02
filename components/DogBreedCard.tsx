import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Breed } from '../types/dog';
import { DogFavoriteButton } from './DogFavoriteButton';

interface DogBreedCardProps {
  breed: Breed;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function DogBreedCard({ breed, isFavorite, onToggleFavorite }: DogBreedCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push(`/${breed.id}`)}
    >
      <Text style={styles.name}>{breed.attributes.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {breed.attributes.description}
      </Text>
      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.label}>Life span:</Text>
          <Text style={styles.value}>
            {breed.attributes.life.min} - {breed.attributes.life.max} years
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hypoallergenic:</Text>
          <Text style={styles.value}>
            {breed.attributes.hypoallergenic ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.actionRow}>
          <Text style={styles.hint}>Tap to see details</Text>
          <DogFavoriteButton isFavorite={isFavorite} onPress={onToggleFavorite} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066cc',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  value: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  actionRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  hint: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '600',
    flexShrink: 1,
  },
});
