import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface DogLoadingStateProps {
  message: string;
}

export function DogLoadingState({ message }: DogLoadingStateProps) {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#0066cc" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
});
