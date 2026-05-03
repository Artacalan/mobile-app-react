import { StyleSheet, Text } from 'react-native';

interface DogEmptyStateProps {
  message?: string;
}

export function DogEmptyState({
  message = 'No dog breeds found.',
}: DogEmptyStateProps) {
  return <Text style={styles.emptyText}>{message}</Text>;
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    paddingVertical: 24,
  },
});
