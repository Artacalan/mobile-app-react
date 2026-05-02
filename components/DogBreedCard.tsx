import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Breed } from '../types/dog';

interface DogBreedCardProps {
  breed: Breed;
}

export function DogBreedCard({ breed }: DogBreedCardProps) {
  return (
    <Link href={`/${breed.id}`} asChild>
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
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
          <Text style={styles.hint}>Tap to see details</Text>
        </View>
      </TouchableOpacity>
    </Link>
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
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '600',
    textAlign: 'right',
  },
});
