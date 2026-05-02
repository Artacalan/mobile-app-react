import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useDogs } from '../provider/DogProvider';

export default function BreedDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { breeds, loading, error } = useDogs();

  const breed = useMemo(
    () => breeds.find((item) => item.id === id),
    [breeds, id]
  );

  if (loading && !breed) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading breed details...</Text>
      </View>
    );
  }

  if (error && !breed) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!breed) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Breed not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: breed.attributes.name }} />

      <View style={styles.card}>
        <Text style={styles.title}>{breed.attributes.name}</Text>
        <Text style={styles.description}>{breed.attributes.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Life span</Text>
          <Text style={styles.sectionValue}>
            {breed.attributes.life.min} - {breed.attributes.life.max} years
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Male weight</Text>
          <Text style={styles.sectionValue}>
            {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Female weight</Text>
          <Text style={styles.sectionValue}>
            {breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} kg
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hypoallergenic</Text>
          <Text style={styles.sectionValue}>
            {breed.attributes.hypoallergenic ? 'Yes' : 'No'}
          </Text>
        </View>

        <Text style={styles.idText}>ID: {breed.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 20,
  },
  section: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0066cc',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sectionValue: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  },
  idText: {
    marginTop: 12,
    fontSize: 12,
    color: '#6b7280',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },
});