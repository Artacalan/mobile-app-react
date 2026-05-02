import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import { useDogs } from '../provider/DogProvider';
import { Breed } from '../types/dog';

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

  const renderBreedItem = ({ item }: { item: Breed }) => (
    <Link href={`/${item.id}`} asChild>
      <TouchableOpacity style={styles.breedCard} activeOpacity={0.8}>
        <Text style={styles.breedName}>{item.attributes.name}</Text>
        <Text style={styles.breedDescription} numberOfLines={2}>
          {item.attributes.description}
        </Text>
        <View style={styles.breedDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Life span:</Text>
            <Text style={styles.detailValue}>
              {item.attributes.life.min} - {item.attributes.life.max} years
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hypoallergenic:</Text>
            <Text style={styles.detailValue}>
              {item.attributes.hypoallergenic ? 'Yes' : 'No'}
            </Text>
          </View>
          <Text style={styles.detailHint}>Tap to see details</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (loading && breeds.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading dog breeds...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchBreeds}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dog Breeds</Text>
        <Text style={styles.pageInfo}>
          Page {Math.max(currentPage, 1)} / {Math.max(totalPages, 1)}
        </Text>
      </View>

      {(loading || loadingMore) && breeds.length > 0 && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="small" color="#0066cc" />
        </View>
      )}

      <FlatList
        data={breeds}
        renderItem={renderBreedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={breeds.length === 0 && styles.emptyListContent}
        onEndReached={loadMoreBreeds}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator size="small" color="#0066cc" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyText}>No dog breeds found.</Text>
          ) : null
        }
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
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
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    paddingVertical: 24,
  },
  breedCard: {
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
  breedName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066cc',
    marginBottom: 8,
  },
  breedDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  breedDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  detailHint: {
    marginTop: 8,
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '600',
    textAlign: 'right',
  },
  loadingIndicator: {
    paddingVertical: 8,
  },
  footerLoading: {
    paddingVertical: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
