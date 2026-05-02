import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface DogLoadingMoreFooterProps {
  loading: boolean;
}

export function DogLoadingMoreFooter({ loading }: DogLoadingMoreFooterProps) {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.footerLoading}>
      <ActivityIndicator size="small" color="#0066cc" />
    </View>
  );
}

const styles = StyleSheet.create({
  footerLoading: {
    paddingVertical: 16,
  },
});
