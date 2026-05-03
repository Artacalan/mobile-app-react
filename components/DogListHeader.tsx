import { StyleSheet, Text, View } from 'react-native';

interface DogListHeaderProps {
  currentPage: number;
  totalPages: number;
}

export function DogListHeader({ currentPage, totalPages }: DogListHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Dog Breeds</Text>
      <Text style={styles.pageInfo}>
        Page {Math.max(currentPage, 1)} / {Math.max(totalPages, 1)}
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
  pageInfo: {
    fontSize: 14,
    color: '#666',
  },
});
