import { StyleSheet, Text, View } from 'react-native';

interface DogFavoritesHeaderProps {
  count: number;
}

export function DogFavoritesHeader({ count }: DogFavoritesHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>
        {count} {count === 1 ? 'saved breed' : 'saved breeds'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
