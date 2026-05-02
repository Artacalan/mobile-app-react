import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDogs } from '../provider/DogProvider';
import { Breed } from '../types/dog';

export default function Page() {
  const { breeds, loading, error, currentPage, totalPages, fetchBreeds } =
    useDogs();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchBreeds(currentPage + 1, 10);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchBreeds(currentPage - 1, 10);
    }
  };

  const renderBreedItem = ({ item }: { item: Breed }) => (
    <View style={styles.breedCard}>
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
      </View>
    </View>
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
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchBreeds(1 , 10)}
        >
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
          Page {currentPage} of {totalPages}
        </Text>
      </View>

      {loading && breeds.length > 0 && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="small" color="#0066cc" />
        </View>
      )}

      <FlatList
        data={breeds}
        renderItem={renderBreedItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.button, currentPage === 1 && styles.buttonDisabled]}
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <Text
            style={[
              styles.buttonText,
              currentPage === 1 && styles.buttonTextDisabled,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          {currentPage} / {totalPages}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            currentPage >= totalPages && styles.buttonDisabled,
          ]}
          onPress={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          <Text
            style={[
              styles.buttonText,
              currentPage >= totalPages && styles.buttonTextDisabled,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
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
  loadingIndicator: {
    paddingVertical: 8,
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#999',
  },
  pageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
